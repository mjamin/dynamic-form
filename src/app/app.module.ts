import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MjCommonModule } from '@mjamin/common';
import { MjDynamicFormModule } from '@mjamin/dynamic-form';
import { MjDynamicFormMaterialModule } from '@mjamin/dynamic-form-material';
import { AngularSplitModule } from 'angular-split';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { AppComponent } from './app.component';
import { MONACO_EDITOR_CONFIG } from './monaco-config';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        AngularSplitModule,
        MonacoEditorModule.forRoot(MONACO_EDITOR_CONFIG),
        MjCommonModule,
        MjDynamicFormModule,
        MjDynamicFormMaterialModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
