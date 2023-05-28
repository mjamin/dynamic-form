/* eslint-disable @angular-eslint/component-selector */
import { Component } from "@angular/core";

import { MjDynamicFormWidgetBase } from "@mjamin/dynamic-form";

/**
 * A dynamic form widget for displaying HTML.
 */
@Component({
    selector: "mj-dynamic-form-widget-html",
    templateUrl: "./html.component.html"
})
export class HtmlComponent extends MjDynamicFormWidgetBase { }
