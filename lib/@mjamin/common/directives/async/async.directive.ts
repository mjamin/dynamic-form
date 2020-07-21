import { Observable } from "rxjs";
import { Directive, TemplateRef, Input, ViewContainerRef, OnInit, EmbeddedViewRef } from "@angular/core";
import { tap } from "rxjs/operators";

import { withSubscriptionSink } from "../../mixins/subscription-sink";

@Directive({
    selector: "[mjAsync][mjAsyncOf]"
})
export class MjAsyncDirective extends withSubscriptionSink() implements OnInit {
    private _viewRef: EmbeddedViewRef<any>;

    @Input() mjAsyncOf: Observable<any>;

    constructor(private _viewContainerRef: ViewContainerRef, private _templateRef: TemplateRef<{ $implicit: any }>) { super(); }

    ngOnInit(): void {
        this.subscribe(this.mjAsyncOf.pipe(
            tap(state => {
                if (!this._viewRef) {
                    this._viewRef = this._viewContainerRef.createEmbeddedView(this._templateRef, { $implicit: state });
                } else {
                    this._viewRef.context.$implicit = state;
                }
            })
        ));
    }
}
