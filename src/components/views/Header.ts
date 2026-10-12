import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IHeader {
  counter: number
}

export class Header extends Component<IHeader> {
protected basketButton: HTMLButtonElement 
protected counterElement: HTMLElement


constructor(container: HTMLElement) {
  super(container);
  this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);
  this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);}

  protected set counter(value: number) {
    this.counterElement.textContent = value.toString();
  }
}