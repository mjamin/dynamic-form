import { tap, startWith, delay, map, distinctUntilChanged } from "rxjs/operators";
import { Component, AfterViewInit, ViewChild, ChangeDetectorRef, ViewEncapsulation } from "@angular/core";
import { FormControl } from "@angular/forms";
import { SplitComponent } from "angular-split";

import { withSubscriptionSink } from "@mjamin/common";
import { MjDynamicFormController, MjDynamicFormSchema } from "@mjamin/dynamic-form";

import { EMPTY_FORM, EXAMPLE_FORM } from "./forms";
import { Observable, Subject } from "rxjs";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent extends withSubscriptionSink() implements AfterViewInit {
    private _editor: monaco.editor.IEditor;
    private _editorDecorationsChange = new Subject<monaco.editor.IMarker[]>();

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
            tap(v => { for (const prop in v) { if (v[prop] === null) { delete v[prop]; } } }),
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
        editorModel.onDidChangeDecorations(() => { this._editorDecorationsChange.next(monaco.editor.getModelMarkers({})); });
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
                this.save("form-schema", this.editorFormControl.value);

                const schema = this.parseFormSchema(this.editorFormControl.value);
                if (schema != null) {
                    this.formController.setSchema(schema);
                }
            })
        ));

        this.subscribe(this._editorDecorationsChange.pipe(
            startWith([]),
            map(markers => markers.length > 0),
            distinctUntilChanged(),
            tap(hasErrors => {
                this.hasErrors = hasErrors;
                this._cdr.detectChanges();
            })
        ));
    }

    private parseFormSchema(value: string): MjDynamicFormSchema {
        let schema: MjDynamicFormSchema = null;
        try {
            schema = JSON.parse(value);
        } catch (error) {
            console.log(error.message);
        }
        return schema;
    }

    private pushEditorValue(value: string): void {
        const selection = this._editor.getSelection();
        const model = this._editor.getModel() as monaco.editor.ITextModel;
        model.pushEditOperations([], [{ range: model.getFullModelRange(), text: value }], () => null);
        this._editor.setSelection(selection);
    }

    private save(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    private load<T>(key: string, defaultValue: T): T {
        return JSON.parse(localStorage.getItem(key)) || defaultValue;
    }
}
