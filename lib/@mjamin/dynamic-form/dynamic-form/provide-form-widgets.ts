import { Provider } from "@angular/core";
import { NamedPortals, provideNamedPortalCollection } from "../core/named-portals";

/**
 * Provides form widgets.
 * 
 * @param portals The named portals.
 * @returns The providers.
 */
export function provideFormWidgets(portals: NamedPortals): Provider[] {
    return provideNamedPortalCollection("dynamic-form-widgets", portals);
}
