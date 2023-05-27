import { NgxMonacoEditorConfig } from "ngx-monaco-editor-v2";
import { FORM_JSON_SCHEMA } from "./form-json-schema";

export function onMonacoLoad(): void {
    const uri = window.monaco.Uri.parse("f://o/o.json");
    window.monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [{
            uri: "http://localhost/form-schema.json",
            fileMatch: [uri.toString()],
            schema: FORM_JSON_SCHEMA
        }]
    });
}

export const MONACO_EDITOR_CONFIG: NgxMonacoEditorConfig = {
    baseUrl: "assets",
    defaultOptions: { scrollBeyondLastLine: false },
    onMonacoLoad
};
