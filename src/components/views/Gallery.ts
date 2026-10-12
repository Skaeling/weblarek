import { Component } from "../base/Component";

interface ICatalog {
  catalog: HTMLElement[]
}

export class Gallery extends Component<ICatalog> {

  constructor(container: HTMLElement) {
    super(container);
  
  }

  set catalog(items: HTMLElement[]) {
    this.container.replaceChildren(...items)
  }
}