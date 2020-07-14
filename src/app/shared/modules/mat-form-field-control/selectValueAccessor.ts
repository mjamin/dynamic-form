/**
 * This file contains angular's selectValueAccessor helper function and related code that's unfortunately not part of the public angular api
 * @see https://github.com/angular/angular/blob/10.0.2/packages/forms/src/directives/shared.ts
 */

import {
    ControlValueAccessor,
    CheckboxControlValueAccessor,
    RangeValueAccessor,
    NumberValueAccessor,
    SelectControlValueAccessor,
    SelectMultipleControlValueAccessor,
    RadioControlValueAccessor,
    NgControl,
    DefaultValueAccessor,
    AbstractControlDirective
} from "@angular/forms";

const BUILTIN_ACCESSORS = [
  CheckboxControlValueAccessor,
  RangeValueAccessor,
  NumberValueAccessor,
  SelectControlValueAccessor,
  SelectMultipleControlValueAccessor,
  RadioControlValueAccessor,
];

function _throwError(dir: AbstractControlDirective, message: string): void {
  let messageEnd: string;
  if (dir.path && dir.path.length > 1) {
    messageEnd = `path: '${dir.path.join(" -> ")}'`;
  } else if (dir.path && dir.path[0]) {
    messageEnd = `name: '${dir.path}'`;
  } else {
    messageEnd = "unspecified name attribute";
  }
  throw new Error(`${message} ${messageEnd}`);
}

export function isBuiltInAccessor(valueAccessor: ControlValueAccessor): boolean {
  return BUILTIN_ACCESSORS.some(a => valueAccessor.constructor === a);
}

// TODO: vsavkin remove it once https://github.com/angular/angular/issues/3011 is implemented
export function selectValueAccessor(
    dir: NgControl, valueAccessors: ControlValueAccessor[]): ControlValueAccessor | null {
    if (!valueAccessors) {
        return null;
    }

    if (!Array.isArray(valueAccessors)) {
        _throwError(dir, "Value accessor was not provided as an array for form control with");
    }

    let defaultAccessor: ControlValueAccessor | undefined;
    let builtinAccessor: ControlValueAccessor | undefined;
    let customAccessor: ControlValueAccessor | undefined;

    valueAccessors.forEach((v: ControlValueAccessor) => {
        if (v.constructor === DefaultValueAccessor) {
            defaultAccessor = v;

        } else if (isBuiltInAccessor(v)) {
            if (builtinAccessor) {
                _throwError(dir, "More than one built-in value accessor matches form control with");
            }
            builtinAccessor = v;

        } else {
            if (customAccessor) {
                _throwError(dir, "More than one custom value accessor matches form control with");
            }
            customAccessor = v;
        }
    });

    if (customAccessor) { return customAccessor; }
    if (builtinAccessor) { return builtinAccessor; }
    if (defaultAccessor) { return defaultAccessor; }

    throw new Error("No valid value accessor for form control with");
}
