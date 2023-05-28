/* eslint-disable @typescript-eslint/ban-types */
import { OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Constructor } from "../constructor";

export interface HasSubscriptionSink extends OnDestroy {
    subscribe(observable: Observable<any>): void;
}

export type HasSubscriptionSinkCtor = Constructor<HasSubscriptionSink>;

export function withSubscriptionSink<T extends Constructor<{}>>(base: T = class {} as T): HasSubscriptionSinkCtor & T {
    return class extends base implements HasSubscriptionSink {
        private _subscriptions: Subscription[] = [];

        subscribe(observable: Observable<any>): void {
            this._subscriptions.push(observable.subscribe());
        }

        ngOnDestroy(): void {
            this._subscriptions.forEach(s => s.unsubscribe());
        }
    };
}
