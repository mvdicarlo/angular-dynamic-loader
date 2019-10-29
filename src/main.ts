import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { DynamicNg2Loader } from './dynamic-loader';

if (environment.production) {
  enableProdMode();
}

var ng2Loader;

window["loadNgComponent"] = function(element, componentName, injectFunction) {
  return ng2Loader.loadComponentAtDom(componentName, element, injectFunction);
}

window["componentExists"] = function(componentName) {
  return Boolean(ng2Loader.getComponentByName(componentName));
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then((ng2ModuleInjector) => {
    ng2Loader = new DynamicNg2Loader(ng2ModuleInjector);
  })
  .catch(err => console.error(err));
