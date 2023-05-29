/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { ChangeDetectorRef, inject } from "@angular/core";
import { Constructor } from "../constructor";

/**
 * Mixin that adds a ChangeDetectorRef to a class.
 * 
 * @param base The base class to extend from.
 * @returns The mixed class.
 */
export function withChangeDetector<T extends Constructor<{}>>(base: T = class {} as T) {
    return class extends base {
        private __withChangeDetector_changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

        /**
         * Creates a new instance of the class.
         * 
         * @param args The arguments.
         */
        constructor(...args: any[]) {
            super(...args);
        }

        /** @inheritdoc */
        protected get changeDetectorRef(): ChangeDetectorRef { return this.__withChangeDetector_changeDetectorRef; }
    };
}
