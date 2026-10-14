import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IBasket {
  list: HTMLElement[];
  price: number

}

interface IBasketActions {
  onOrder: () => void;

}
export class Basket extends Component<IBasket> {
  protected listElements: HTMLElement
  protected orderButton: HTMLButtonElement
  protected priceElement: HTMLElement
  


  constructor(container: HTMLElement, actions?: IBasketActions){
    super(container);
    this.listElements = ensureElement<HTMLElement>('.basket__list', this.container)
    this.orderButton = ensureElement<HTMLButtonElement>('.basket__button', this.container)
    this.priceElement = ensureElement<HTMLElement>('.basket__price', this.container)

    if (actions?.onOrder) {
      this.orderButton.addEventListener('click', actions.onOrder);
    }
  }

  protected set list(items: HTMLElement[]) {
    this.listElements.replaceChildren(...items)

  }

  protected set price(value: number) {
    this.priceElement.textContent = `${value} синапсов`

  }
}