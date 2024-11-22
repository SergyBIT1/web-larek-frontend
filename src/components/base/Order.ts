import { IOrderForm, IUser } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Form } from "../common/Form";
import { IEvents } from "./events";

export class Order extends Form<IUser> {
  protected buttonPayCash: HTMLButtonElement;
	protected buttonPayCard: HTMLButtonElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this.buttonPayCash = ensureElement<HTMLButtonElement>(
      '.button_alt[name=cash]',
      container
    );
    this.buttonPayCard = ensureElement<HTMLButtonElement>(
      '.button_alt[name=card]',
      container
    );

    this.buttonPayCash.addEventListener('click', () => {
      this.onInputChange('payment', 'cash');
    });
    this.buttonPayCard.addEventListener('click', () => {
      this.onInputChange('payment', 'card');
    });
    
}
set payment(value: string) {
  this.buttonPayCash.classList.toggle('button_alt-active', value === 'cash');
  this.buttonPayCard.classList.toggle('button_alt-active', value === 'card');
}

disableButtons() {
  this.buttonPayCard.classList.remove('button_alt-active');
  this.buttonPayCash.classList.remove('button_alt-active');
}


  set address(value: string) {
    (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
  }
  
}