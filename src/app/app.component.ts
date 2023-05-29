import { AsyncPipe } from "@angular/common";
import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { ReactiveFormsModule, UntypedFormControl } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
import { withChangeDetector, withSubscriptionSink } from "@mjamin/common";
import { MjDynamicFormController, MjDynamicFormSchema } from "@mjamin/dynamic-form";
import { MjCardFormComponent } from "@mjamin/dynamic-form-material";
import { AngularSplitModule, SplitComponent } from "angular-split";
import type { editor } from "monaco-editor";
import { MonacoEditorModule } from "ngx-monaco-editor-v2";
import { Observable, Subject } from "rxjs";
import { delay, distinctUntilChanged, map, startWith, tap } from "rxjs/operators";
import { AppFormActionsComponent } from "./app-form-actions/app-form-actions.component";
import { EMPTY_FORM, EXAMPLE_FORM } from "./forms";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [AngularSplitModule, MonacoEditorModule, ReactiveFormsModule, MatToolbarModule, AppFormActionsComponent, MjCardFormComponent, AsyncPipe]
})
export class AppComponent extends withChangeDetector(withSubscriptionSink()) implements AfterViewInit {
    private _editor: editor.IEditor;
    private _editorDecorationsChange = new Subject<editor.IMarker[]>();

    @ViewChild("hsplit") hSplitComponent: SplitComponent;

    editorFormControl = new UntypedFormControl(this.load("form-schema", EXAMPLE_FORM));
    editorOptions: editor.IStandaloneEditorConstructionOptions = { theme: "vs" };
    formController = new MjDynamicFormController();
    hasErrors = false;

    get values(): Observable<string> {
        return this.formController.values.pipe(
            map(values => ({...values})),
            tap(v => { for (const prop in v) { if (v[prop] === null) { delete v[prop]; } } }),
            map(v => JSON.stringify(v, null, 1).replace(/\n/g, "").replace(/\[ /g, "[").replace(/ \]/g, "]").replace(/}$/, " }"))
        );
    }

    onSave(event: Event): void {
        this.formController.submit(event);
    }

    onReset(): void {
        this.formController.reset();
    }

    onDelete(): void {
        this.pushEditorValue(EMPTY_FORM);
    }

    onLoad(): void {
        this.pushEditorValue(EXAMPLE_FORM);
    }

    onEditorInit(standaloneEditor: editor.IStandaloneCodeEditor): void {
        const editorModel = window.monaco.editor.createModel(this.editorFormControl.value, "json", window.monaco.Uri.parse("f://o/o.json"));
        editorModel.onDidChangeDecorations(() => { this._editorDecorationsChange.next(window.monaco.editor.getModelMarkers({})); });
        this._editor = standaloneEditor;
        this._editor.setModel(editorModel);
    }

    ngAfterViewInit(): void {
        this.subscribe(this.hSplitComponent.dragProgress$.pipe(
            tap(() => { if (this._editor) { this._editor.layout(); } })
        ));

        this.subscribe(this.editorFormControl.valueChanges.pipe(
            startWith(this.editorFormControl.value),
            delay(0), // skip current change detection cycle
            tap(value => {
                this.save("form-schema", value);

                const schema = this.parseFormSchema(value);
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
                this.changeDetectorRef.detectChanges();
            })
        ));
    }

    private parseFormSchema(value: string): MjDynamicFormSchema {
        let schema: MjDynamicFormSchema = null;
        try {
            schema = JSON.parse(value);
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message);
            }
        }
        return schema;
    }

    private pushEditorValue(value: string): void {
        const selection = this._editor.getSelection();
        const model = this._editor.getModel() as editor.ITextModel;
        model.pushEditOperations([], [{ range: model.getFullModelRange(), text: value }], () => null);
        this._editor.setSelection(selection);
    }

    private save<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    private load<T>(key: string, defaultValue: T): T {
        return JSON.parse(localStorage.getItem(key)) || defaultValue;
    }
}
