import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";

interface ICardBasket {
  index: string,
}

interface ICardBasketActions {
  onRemove: () => void;
}
export class CardBasket extends Card<&ICardBasket> {
  protected indexElement: HTMLElement
  protected deleteButton: HTMLButtonElement

  constructor(container: HTMLElement, actions?: ICardBasketActions) {
  super(container);
  this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
  this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
  
  if (actions?.onRemove) {
      this.deleteButton.addEventListener('click', actions.onRemove);
    }
}

 protected set index(value: number) {
    this.indexElement.textContent = value.toString();
  }


    }