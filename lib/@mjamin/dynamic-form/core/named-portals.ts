/* eslint-disable @typescript-eslint/no-explicit-any */
import { CdkPortalOutlet, ComponentPortal, ComponentType, TemplatePortal } from "@angular/cdk/portal";
import { ComponentRef, EmbeddedViewRef, Inject, Injectable, InjectionToken, Injector, Provider, StaticProvider, TemplateRef } from "@angular/core";

/**
 * A map of named portals.
 */
export declare type NamedPortals = {[key: string]: ComponentType<any>};

/**
 * A named collection of named portals.
 */
export interface NamedPortalCollection {
    name: string;
    portals: NamedPortals;
}

/**
 * Provides a named portal collection.
 * 
 * @param name The name of the collection.
 * @param portals The portals of the collection.
 * @returns 
 */
export function provideNamedPortalCollection(name: string, portals: NamedPortals): Provider[] {
    return [
        { provide: NAMED_PORTAL_COLLECTION, useValue: { name, portals }, multi: true }
    ];
}

/**
 * A token for a named portal collection.
 */
export const NAMED_PORTAL_COLLECTION = new InjectionToken<NamedPortalCollection>("Named Portal Collections");

/**
 * A service for attaching named portals.
 */
@Injectable({ providedIn: "root" })
export class NamedPortalService {
    constructor(@Inject(NAMED_PORTAL_COLLECTION) private _namedPortalCollections: NamedPortalCollection[], private _injector: Injector) { }

    /**
     * Create a context for attaching named portals.
     * 
     * @param collectionName The name of the collection.
     * @param defaultType The default type to use if no portal with the given name is found.
     * @returns A context for attaching named portals.
     */
    for<T>(collectionName: string, defaultType: ComponentType<T> = null): NamedPortalServiceContext<T> {
        const namedPortals = this._namedPortalCollections
            .filter(c => c.name === collectionName)
            .map(c => c.portals)
            .reduce((a, b) => ({...a, ...b}), {});

        return new NamedPortalServiceContext(namedPortals, this._injector, defaultType);
    }
}

/**
 * A context for attaching named portals.
 */
export class NamedPortalServiceContext<TComponent> {
    constructor(private _namedPortals: NamedPortals, private _injector: Injector, private _defaultType: ComponentType<TComponent> = null) { }

    /**
     * Attach a template to the given outlet.
     */
    attachTemplate<TContext>(templateRef: TemplateRef<TContext>, outlet: CdkPortalOutlet, context: TContext): EmbeddedViewRef<TContext> {
        if (outlet.hasAttached()) {
            throw new Error("Outlet has already a template attached.");
        }

        return outlet.attachTemplatePortal(new TemplatePortal<TContext>(templateRef, null, context));
    }

    /**
     * Attach a component to the given outlet.
     * 
     * @param component The component to attach.
     * @param outlet The outlet to attach the component to.
     * @param injector The injector to use for the component.
     * @param providers The providers to use for the component.
     * @returns The component reference.
     */
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

    /**
     * Get the component type for the given type string.
     * 
     * @param type The type string of the component.
     * @returns The component type.
     */
    getComponentType(type: string): ComponentType<TComponent> {
        const component = this._namedPortals[type];
        return component ? component : this._defaultType;
    }
}
