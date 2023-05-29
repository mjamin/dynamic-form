import { CheckboxComponent } from "./checkbox/checkbox.component";
import { HtmlComponent } from "./html/html.component";
import { RadioComponent } from "./radio/radio.component";
import { SelectComponent } from "./select/select.component";
import { TextComponent } from "./text/text.component";
import { TextareaComponent } from "./textarea/textarea.component";

export const MATERIAL_FORM_WIDGETS = {
    checkbox: CheckboxComponent,
    radio: RadioComponent,
    select: SelectComponent,
    textarea: TextareaComponent,
    text: TextComponent,
    html: HtmlComponent
}