import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";


export abstract class Form<T = object> extends Component<object & T> {
protected errorsElement: HTMLElement 
protected submitButton: HTMLButtonElement

constructor(protected events: IEvents, protected container: HTMLFormElement) {
  super(container);
  this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);
  this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);

}

protected set errors(value: string) {
  this.errorsElement.textContent = value
}

protected set valid(value: boolean) {
  this.submitButton.disabled = !value;
}



}