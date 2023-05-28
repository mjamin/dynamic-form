import { importProvidersFrom } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { MjDynamicFormMaterialModule } from "@mjamin/dynamic-form-material";
import { AngularSplitModule } from "angular-split";
import { MonacoEditorModule } from "ngx-monaco-editor-v2";
import { AppComponent } from "./app/app.component";
import { MONACO_EDITOR_CONFIG } from "./app/monaco-config";

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatToolbarModule, AngularSplitModule, MonacoEditorModule.forRoot(MONACO_EDITOR_CONFIG), MjDynamicFormMaterialModule.forRoot()),
        provideAnimations()
    ]
}).catch(err => console.error(err));
