import { Provider } from "@angular/core";
import { ControlContainer, FormGroupDirective } from "@angular/forms";

/**
 * Provides a control container.
 * 
 * @returns A provider for a control container.
 */
export function provideControlContainer(): Provider {
    return { provide: ControlContainer, useExisting: FormGroupDirective };
}
