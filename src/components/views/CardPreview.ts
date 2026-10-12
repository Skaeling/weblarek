import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";


export class CardPreview extends Card {
  protected textElement: HTMLElement
  protected buyButton: HTMLButtonElement

  constructor(container: HTMLElement) {
  super(container);
  this.textElement = ensureElement<HTMLElement>('.card__text', this.container);
  this.buyButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

}

 protected set text(value: string) {
    this.textElement.textContent = value;
  }

    }