import { IProduct } from "../../types";
import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

type TCategory = keyof typeof categoryMap


export abstract class Card<T = object> extends Component<IProduct & T> {
protected categoryElement: HTMLElement 
protected titleElement: HTMLElement  
protected imageElement: HTMLImageElement 
protected priceElement: HTMLElement 

constructor(container: HTMLElement) {
  super(container);
  this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
  this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
  this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
  this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);


}
  protected set category(value: TCategory) {
    Object.values(categoryMap).forEach((className) => {this.categoryElement.classList.remove(className)});
    this.categoryElement.textContent = value;
    this.categoryElement.classList.add(categoryMap[value])


  }

  protected set title(value: string) {
    this.titleElement.textContent = value;
  }

  protected set price(value: number) {
    this.priceElement.textContent = `${value} синапсов`;
  }

  protected set image(value: string) {
    this.imageElement.src = value;
  }
}