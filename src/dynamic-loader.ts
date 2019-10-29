import { ApplicationRef, ComponentFactoryResolver, ComponentRef, NgZone } from '@angular/core';

export class DynamicNg2Loader {
  private appRef: ApplicationRef;
  protected componentFactoryResolver: ComponentFactoryResolver;
  private zone: NgZone;

  constructor(private injector: any) {
    this.appRef = injector.get(ApplicationRef);
    this.zone = injector.get(NgZone);
    this.componentFactoryResolver = injector.get(ComponentFactoryResolver);
  }

  getComponentByName(componentSelector: String): any {
    const factoryList = this.componentFactoryResolver["_factories"].values();
    for (let next = factoryList.next(); !next.done; next = factoryList.next()) {
      if (next.value.selector === componentSelector) {
        return next.value.componentType;
      }
    }

    return undefined;
  }

  loadComponentAtDom<T>(componentName: String, dom: Element, onInit?: (Component: T) => void): ComponentRef<T> {
    let componentRef: ComponentRef<any>;
    this.zone.run(() => {
      try {
        let component = this.getComponentByName(componentName);
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        componentRef = componentFactory.create(this.injector, [], dom);
        onInit && onInit(componentRef.instance);
        this.appRef.attachView(componentRef.hostView);
      } catch (e) {
        console.error("Unable to load component", componentName, "at", dom, e);
      }
    });
    return componentRef;
  }
}
