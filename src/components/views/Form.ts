import { IForm, TValidationErrors } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export abstract class Form<T = object> extends Component<IForm & T> {
protected errorsElement: HTMLElement 
protected submitButton: HTMLButtonElement

constructor(protected events: IEvents, protected container: HTMLFormElement) {
  super(container);
  this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);
  this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);

}

protected set errors(value: TValidationErrors) {
  //убираем undefined значения из массива ошибок
  this.errorsElement.textContent = Object.values(value).filter(Boolean).join(';')
  
}

protected set valid(value: boolean) {
  this.submitButton.disabled = !value;
}



}