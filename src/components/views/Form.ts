import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";


export abstract class Form<T = object> extends Component<object & T> {
protected errorsElement: HTMLElement 
protected buttonSubmit: HTMLButtonElement

constructor(container: HTMLElement) {
  super(container);
  this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);
  this.buttonSubmit = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);

}


}