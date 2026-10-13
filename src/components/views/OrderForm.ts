import { TPayment } from "../../types";
import { ensureAllElements, ensureElement } from "../../utils/utils";
import { Form } from "./Form";


export class OrderForm extends Form {
  protected paymentButtons: HTMLButtonElement[]
  protected addressInput: HTMLInputElement
  

constructor(container: HTMLFormElement) {
  super(container);
  this.paymentButtons = ensureAllElements<HTMLButtonElement>('order__buttons', this.container)
  this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container)


}

protected set payment(value: TPayment | null) {
    this.paymentButtons.forEach((button) => {
      button.classList.toggle('button_alt-active', button.name === value);
    });
  }

protected set address(value: string) {
  this.addressInput.textContent = value
}

}