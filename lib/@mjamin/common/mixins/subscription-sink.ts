/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { DestroyRef, inject } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Constructor } from "../constructor";

export interface HasSubscriptionSink {
    subscribe<T>(observable: Observable<T>): void;
}

export type HasSubscriptionSinkCtor = Constructor<HasSubscriptionSink>;

export function withSubscriptionSink<T extends Constructor<{}>>(base: T = class {} as T): HasSubscriptionSinkCtor & T {
    return class extends base implements HasSubscriptionSink {
        private __withSubscriptionSink_destroyRef: DestroyRef = inject(DestroyRef);
        private __withSubscriptionSink_subscriptions: Subscription[] = [];

        constructor(...args: any[]) {
            super(...args);

            this.__withSubscriptionSink_destroyRef.onDestroy(() => this.__withSubscriptionSink_subscriptions.forEach(s => s.unsubscribe()));
        }

        subscribe<T>(observable: Observable<T>): void {
            this.__withSubscriptionSink_subscriptions.push(observable.subscribe());
        }
    };
}
