import { tap, startWith, delay } from "rxjs/operators";
import { Component, AfterViewInit, ViewChild, ChangeDetectorRef, ViewEncapsulation } from "@angular/core";
import { FormControl } from "@angular/forms";

import { SplitComponent } from "angular-split";

import { withSubscriptionSink } from "@mjamin/subscription-sink";
import { DynamicFormController } from "@mjamin/dynamic-form";

import { DEFAULT_FORM } from "./default-form";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent extends withSubscriptionSink() implements AfterViewInit {
    private _editor: monaco.editor.IEditor;

    editorFormControl = new FormControl(this.load("form-schema", DEFAULT_FORM));
    editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = { theme: "vs" };
    formController = new DynamicFormController();
    hasErrors = false;
    splitData = this.load("angular-split", { gutterNum: 1, sizes: [38.2, 61.8] });

    @ViewChild(SplitComponent) splitComponent: SplitComponent;

    constructor(private _cdr: ChangeDetectorRef) {
        super();
    }

    visible = true;

    toggle(): void {
        this.visible = !this.visible;
    }

    onEditorInit(editor: any): void {
        const editorModel = monaco.editor.createModel(this.editorFormControl.value, "json", monaco.Uri.parse("f://o/o.json"));
        editorModel.onDidChangeDecorations(() => { this.updateErrorState(); });
        this._editor = editor;
        this._editor.setModel(editorModel);
    }

    ngAfterViewInit(): void {
        this.subscribe(this.splitComponent.dragProgress$.pipe(
            tap(v => {
                this.save("angular-split", v);
                if (this._editor) {
                    this._editor.layout();
                }
            })
        ));

        this.subscribe(this.editorFormControl.valueChanges.pipe(
            startWith(this.editorFormControl.value),
            delay(0), // skip current change detection cycle
            tap(() => {
                try {
                    this.save("form-schema", this.editorFormControl.value);
                    this.formController.setSchema(this.editorFormControl.value ? JSON.parse(this.editorFormControl.value) : { tabs: [] });
                } catch (error) {
                    console.log(error.message);
                }
            })
        ));
    }

    private updateErrorState(): void {
        const hasErrors = monaco.editor.getModelMarkers({}).length > 0;
        if (hasErrors !== this.hasErrors) {
            this.hasErrors = hasErrors;
            this._cdr.detectChanges();
        }
    }

    private save(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    private load<T>(key: string, defaultValue: T): T {
        return JSON.parse(localStorage.getItem(key)) || defaultValue;
    }
}
