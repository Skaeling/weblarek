import { TOrderForm, TPayment } from "../../types";
import { ensureAllElements, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";


export class OrderForm extends Form<TOrderForm> {
  protected paymentButtons: HTMLButtonElement[]
  protected addressInput: HTMLInputElement
  

constructor(events: IEvents, container: HTMLFormElement) {
  super(events, container);
  this.paymentButtons = ensureAllElements<HTMLButtonElement>('.order__buttons button', this.container)
  this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container)
  this.container.addEventListener('submit', (event) => {
      event.preventDefault();
      this.events.emit('orderForm:submitted');
    });

  this.paymentButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.events.emit('orderForm:changed', { field: 'payment', value: button.name });
      });
    });

  this.addressInput.addEventListener('input', () => {
      this.events.emit('orderForm:changed', {
        field: 'address',
        value: this.addressInput.value,
      });
    })

}

protected set payment(value: TPayment | null) {
    this.paymentButtons.forEach((button) => {
      button.classList.toggle('button_alt-active', button.name === value);
    });


  }

protected set address(value: string) {
  this.addressInput.value = value
}

}