/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { DestroyRef, inject } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Constructor } from "../constructor";

/**
 * Mixin that adds a subscription sink to a class.
 */
export interface HasSubscriptionSink {
    /**
     * Subscribes to the given observable and adds the subscription to the sink.
     * 
     * @param observable The observable to subscribe to.
     */
    subscribe<T>(observable: Observable<T>): void;
}

/**
 * Constructor for HasSubscriptionSink.
 */
export type HasSubscriptionSinkCtor = Constructor<HasSubscriptionSink>;

/**
 * Mixin that adds a subscription sink to a class.
 * 
 * @param base The base class to extend from.
 * @returns The mixed class.
 */
export function withSubscriptionSink<T extends Constructor<{}>>(base: T = class {} as T): HasSubscriptionSinkCtor & T {
    return class extends base implements HasSubscriptionSink {
        private __withSubscriptionSink_destroyRef: DestroyRef = inject(DestroyRef);
        private __withSubscriptionSink_subscriptions: Subscription[] = [];

        /**
         * Creates a new instance of the class.
         * 
         * @param args The arguments.
         */
        constructor(...args: any[]) {
            super(...args);

            this.__withSubscriptionSink_destroyRef.onDestroy(() => this.__withSubscriptionSink_subscriptions.forEach(s => s.unsubscribe()));
        }

        /** @inheritdoc */
        subscribe<T>(observable: Observable<T>): void {
            this.__withSubscriptionSink_subscriptions.push(observable.subscribe());
        }
    };
}
