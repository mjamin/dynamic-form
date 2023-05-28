import { CdkPortalOutlet, ComponentPortal, ComponentType, PortalInjector, TemplatePortal } from "@angular/cdk/portal";
import { ComponentRef, EmbeddedViewRef, Inject, Injectable, InjectionToken, Injector, Provider, TemplateRef } from "@angular/core";

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

    for(collectionName: string, defaultType: ComponentType<any> = null): NamedPortalServiceContext {
        const namedPortals = this._namedPortalCollections
            .filter(c => c.name === collectionName)
            .map(c => c.portals)
            .reduce((a, b) => ({...a, ...b}), {});

        return new NamedPortalServiceContext(namedPortals, this._injector, defaultType);
    }
}

export class NamedPortalServiceContext {
    constructor(private _namedPortals: NamedPortals, private _injector: Injector, private _defaultType: ComponentType<any> = null) { }

    attachTemplate(templateRef: TemplateRef<any>, outlet: CdkPortalOutlet, context: any): EmbeddedViewRef<any> {
        if (outlet.hasAttached()) {
            throw new Error("Outlet has already a template attached.");
        }

        return outlet.attachTemplatePortal(new TemplatePortal<any>(templateRef, null, context));
    }

    attachComponent(component: string | ComponentType<any>, outlet: CdkPortalOutlet, injector: Injector = null, customTokens: [any, any][] = []): ComponentRef<any> {
        if (outlet.hasAttached()) {
            throw new Error("Outlet has already a component attached.");
        }

        const componentType = typeof component === "string"
            ? this.getComponentType(component)
            : component;

        if (!componentType) {
            return null;
        }

        return outlet.attachComponentPortal(new ComponentPortal(componentType, null, new PortalInjector(injector || this._injector, new WeakMap<any, any>(customTokens))));
    }

    getComponentType(type: string): ComponentType<any> {
        const component = this._namedPortals[type];
        return component ? component : this._defaultType;
    }
}
