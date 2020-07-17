import { Provider } from "@angular/core";
import { ControlContainer, FormGroupDirective } from "@angular/forms";

export function provideControlContainer(): Provider {
    return { provide: ControlContainer, useExisting: FormGroupDirective };
}
