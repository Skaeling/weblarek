import { TContactsForm } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";

export class ContactsForm extends Form<TContactsForm> {
  protected emailInput: HTMLInputElement
  protected phoneInput: HTMLInputElement


constructor(events: IEvents, container: HTMLFormElement) {
  super(events, container);
  this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container)
  this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container)
  this.container.addEventListener('submit', (event) => {
      event.preventDefault();
      this.events.emit('contacts:submitted');
    });

  this.emailInput.addEventListener('input', () => {
      this.events.emit('contacts:changed', {
        field: 'email',
        value: this.emailInput.value,
      });
    })
  
  this.phoneInput.addEventListener('input', () => {
      this.events.emit('contacts:changed', {
        field: 'phone',
        value: this.phoneInput.value,
      });
    })
}

protected set email(value: string) {
  this.emailInput.value = value
}

protected set phone(value: string) {
  this.phoneInput.value = value
}

}