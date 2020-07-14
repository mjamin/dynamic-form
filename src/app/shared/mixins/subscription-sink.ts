import { Observable, Subscription } from "rxjs";
import { OnDestroy } from "@angular/core";

import { Constructor } from "../common/constructor";

export interface HasSubscriptionSink extends OnDestroy {
    subscribe(observable: Observable<any>): void;
}

export type HasSubscriptionSinkCtor = Constructor<HasSubscriptionSink>;

export function withSubscriptionSink<T extends Constructor<{}>>(base: T = class {} as T): HasSubscriptionSinkCtor & T {
    return class extends base implements OnDestroy {
        private _subscriptions: Subscription[] = [];

        subscribe(observable: Observable<any>): void {
            this._subscriptions.push(observable.subscribe());
        }

        ngOnDestroy(): void {
            this._subscriptions.forEach(s => s.unsubscribe());
        }
    };
}
