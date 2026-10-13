import { ensureElement } from "../../utils/utils";
import { Form } from "./Form";


export class ContactsForm extends Form {
  protected emailInput: HTMLInputElement
  protected phoneInput: HTMLInputElement


constructor(container: HTMLFormElement) {
  super(container);
  this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container)
  this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container)

}

protected set email(value: string) {
  this.emailInput.textContent = value
}

protected set phone(value: string) {
  this.phoneInput.textContent = value
}

}