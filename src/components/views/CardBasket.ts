import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";


export class CardBasket extends Card {
  protected indexElement: HTMLElement
  protected deleteButton: HTMLButtonElement

  constructor(container: HTMLElement) {
  super(container);
  this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
  this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

}

 protected set index(value: string) {
    this.indexElement.textContent = value;
  }


    }