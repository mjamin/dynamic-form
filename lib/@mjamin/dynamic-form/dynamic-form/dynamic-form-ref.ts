import { Observable } from "rxjs";

import { DynamicFormEvent } from "./dynamic-form-event";
import { DynamicFormSchema } from "./dynamic-form-schema";

// TODO: re-evaluate necessity
export interface DynamicFormRef {
    readonly formEvents: Observable<DynamicFormEvent>;
    setSchema(schema: DynamicFormSchema, emitEvent?: boolean): void;
    setValues(values: {[key: string]: any}, emitEvent?: boolean): void;
    markForCheck(): void;
}
