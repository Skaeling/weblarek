import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IOrderSuccess {
  description: number;
}

interface IOrderSuccessActions {
  onClose: () => void;
}

export class OrderSuccess extends Component<IOrderSuccess> {
  protected descriptionElement: HTMLElement
  protected closeButton: HTMLButtonElement

  constructor(container: HTMLElement, actions?: IOrderSuccessActions){
    super(container)
    this.descriptionElement = ensureElement<HTMLElement>('.order-success__description', this.container)
    this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container)

    if(actions?.onClose) {
      this.closeButton.addEventListener('click', actions.onClose)
    }
  }

  protected set description(value: number) {
    this.descriptionElement.textContent = `Списано ${value} синапсов`
  }
}