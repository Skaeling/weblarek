import { ICardPreview, ICardPreviewActions, TCategory } from "../../types";
import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";



export class CardPreview extends Card<&ICardPreview> {
  protected textElement: HTMLElement
  protected buyButton: HTMLButtonElement
  protected categoryElement: HTMLElement 
  protected imageElement: HTMLImageElement

  constructor(container: HTMLElement, actions?: ICardPreviewActions) {
  super(container);
  this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
  this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
  this.textElement = ensureElement<HTMLElement>('.card__text', this.container);
  this.buyButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

  if (actions?.onAction) {
      this.buyButton.addEventListener('click', actions.onAction)
    }
}

 protected set text(value: string) {
    this.textElement.textContent = value;
  }

 protected set category(value: TCategory) {
    Object.values(categoryMap).forEach((className) => {this.categoryElement.classList.remove(className)});
    this.categoryElement.textContent = value;
    this.categoryElement.classList.add(categoryMap[value])
  }

protected set image(value: string) {
    this.imageElement.src = value;
  }

protected set buttonText(value: string) {
  this.buyButton.textContent = value
}

protected set valid(value: boolean) {
    this.buyButton.disabled = !value;
  }

    }