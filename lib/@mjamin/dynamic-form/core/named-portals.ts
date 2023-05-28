/* eslint-disable @typescript-eslint/no-explicit-any */
import { CdkPortalOutlet, ComponentPortal, ComponentType, TemplatePortal } from "@angular/cdk/portal";
import { ComponentRef, EmbeddedViewRef, Inject, Injectable, InjectionToken, Injector, Provider, StaticProvider, TemplateRef } from "@angular/core";

export declare type NamedPortals = {[key: string]: ComponentType<any>};

export interface NamedPortalCollection {
    name: string;
    portals: NamedPortals;
}

export function provideNamedPortalCollection(name: string, portals: NamedPortals): Provider[] {
    return [
        { provide: NAMED_PORTAL_COLLECTION, useValue: { name, portals }, multi: true }
    ];
}

export const NAMED_PORTAL_COLLECTION = new InjectionToken<NamedPortalCollection>("Named Portal Collections");

@Injectable({ providedIn: "root" })
export class NamedPortalService {
    constructor(@Inject(NAMED_PORTAL_COLLECTION) private _namedPortalCollections: NamedPortalCollection[], private _injector: Injector) { }

    for<T>(collectionName: string, defaultType: ComponentType<T> = null): NamedPortalServiceContext<T> {
        const namedPortals = this._namedPortalCollections
            .filter(c => c.name === collectionName)
            .map(c => c.portals)
            .reduce((a, b) => ({...a, ...b}), {});

        return new NamedPortalServiceContext(namedPortals, this._injector, defaultType);
    }
}

export class NamedPortalServiceContext<TComponent> {
    constructor(private _namedPortals: NamedPortals, private _injector: Injector, private _defaultType: ComponentType<TComponent> = null) { }

    attachTemplate<TContext>(templateRef: TemplateRef<TContext>, outlet: CdkPortalOutlet, context: TContext): EmbeddedViewRef<TContext> {
        if (outlet.hasAttached()) {
            throw new Error("Outlet has already a template attached.");
        }

        return outlet.attachTemplatePortal(new TemplatePortal<TContext>(templateRef, null, context));
    }

    attachComponent(component: string | ComponentType<TComponent>, outlet: CdkPortalOutlet, injector: Injector = null, providers: StaticProvider[] = []): ComponentRef<TComponent> {
        if (outlet.hasAttached()) {
            throw new Error("Outlet has already a component attached.");
        }

        const componentType = typeof component === "string"
            ? this.getComponentType(component)
            : component;

        if (!componentType) {
            return null;
        }

        const portalInjector = Injector.create({
            parent: injector,
            providers: providers
        });

        return outlet.attachComponentPortal(new ComponentPortal(componentType, null, portalInjector));
    }

    getComponentType(type: string): ComponentType<TComponent> {
        const component = this._namedPortals[type];
        return component ? component : this._defaultType;
    }
}
