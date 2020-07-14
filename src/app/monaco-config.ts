import { NgxMonacoEditorConfig } from "ngx-monaco-editor";
import { FORM_JSON_SCHEMA } from "./form-json-schema";

export function onMonacoLoad(): void {
    const uri = monaco.Uri.parse("f://o/o.json");
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
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
