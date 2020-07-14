import { Provider } from "@angular/core";

import { provideNamedPortalCollection, NamedPortals } from "../shared/common/named-portals";

export function provideFormWidgets(portals: NamedPortals): Provider[] {
    return provideNamedPortalCollection("dynamic-form-widgets", portals);
}
