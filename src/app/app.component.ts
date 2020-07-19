import { tap, startWith, delay, map } from "rxjs/operators";
import { Component, AfterViewInit, ViewChild, ChangeDetectorRef, ViewEncapsulation } from "@angular/core";
import { FormControl } from "@angular/forms";
import { SplitComponent } from "angular-split";

import { withSubscriptionSink } from "@mjamin/common";
import { MjDynamicFormController } from "@mjamin/dynamic-form";

import { EMPTY_FORM, EXAMPLE_FORM } from "./forms";
import { Observable } from "rxjs";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent extends withSubscriptionSink() implements AfterViewInit {
    private _editor: monaco.editor.IEditor;

    editorFormControl = new FormControl(this.load("form-schema", EXAMPLE_FORM));
    editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = { theme: "vs" };
    formController = new MjDynamicFormController();
    hasErrors = false;
    hSplitData = this.load("angular-split-h", { gutterNum: 1, sizes: [38.2, 61.8] });
    vSplitData = this.load("angular-split-v", { gutterNum: 1, sizes: [85.41, 14.59] });

    @ViewChild("hsplit") hSplitComponent: SplitComponent;
    @ViewChild("vsplit") vSplitComponent: SplitComponent;

    constructor(private _cdr: ChangeDetectorRef) {
        super();
    }

    get values(): Observable<string> {
        return this.formController.values.pipe(
            map(v => JSON.stringify(v, null, 1).replace(/\n/g, "").replace(/\[ /g, "[").replace(/ \]/g, "]").replace(/}$/, " }"))
        );
    }

    onDelete(): void {
        this.pushEditorValue(EMPTY_FORM);
    }

    onReset(): void {
        this.pushEditorValue(EXAMPLE_FORM);
    }

    onEditorInit(editor: any): void {
        const editorModel = monaco.editor.createModel(this.editorFormControl.value, "json", monaco.Uri.parse("f://o/o.json"));
        editorModel.onDidChangeDecorations(() => { this.updateErrorState(); });
        this._editor = editor;
        this._editor.setModel(editorModel);
    }

    ngAfterViewInit(): void {
        this.subscribe(this.hSplitComponent.dragProgress$.pipe(
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

    private pushEditorValue(value: string): void {
        const selection = this._editor.getSelection();
        const model = this._editor.getModel() as monaco.editor.ITextModel;
        model.pushEditOperations([], [{ range: model.getFullModelRange(), text: value }], () => null);
        this._editor.setSelection(selection);
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
