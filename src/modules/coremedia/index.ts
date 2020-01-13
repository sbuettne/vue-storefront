import { module } from './store'
import { StorefrontModule } from '@vue-storefront/core/lib/modules'

export const KEY = 'coremedia';

export const CoreMediaModule: StorefrontModule = function ({store, router, appConfig}) {
  store.registerModule(KEY, module);
};
