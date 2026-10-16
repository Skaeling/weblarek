import { IHeader, IHeaderActions } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export class Header extends Component<IHeader> {
protected basketButton: HTMLButtonElement 
protected counterElement: HTMLElement


constructor(container: HTMLElement, actions?: IHeaderActions) {
  super(container);
  this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);
  this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);
  
  if (actions?.onCartClick) {
    this.basketButton.addEventListener('click', actions.onCartClick);
  }
}

  protected set counter(value: number) {
    this.counterElement.textContent = value.toString();
  }
}