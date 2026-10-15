import { IProduct, TCategory } from "../../types";
import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";

export interface TCardCatalog extends Pick<IProduct, 'image' | 'category'>{}

interface ICardCatalogActions {
  onClick: () => void;
}

export class CardCatalog extends Card<& TCardCatalog> {
protected categoryElement: HTMLElement 
protected imageElement: HTMLImageElement 

constructor(container: HTMLElement, actions?: ICardCatalogActions) {
  super(container);
    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
  
  if (actions?.onClick) {
      this.container.addEventListener('click', actions.onClick);
    }
}

protected set category(value: TCategory) {
    Object.values(categoryMap).forEach((className) => {this.categoryElement.classList.remove(className)});
    this.categoryElement.textContent = value;
    this.categoryElement.classList.add(categoryMap[value])


  }

  protected set image(value: string) {
    this.imageElement.src = value;
  }

}