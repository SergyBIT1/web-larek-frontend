import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

interface IPage {
  catalog: HTMLElement[];
  counter: number;
  basket: HTMLElement;

}

export class Page extends Component<IPage> {
  protected _catalog: HTMLElement;
  protected _counter: HTMLElement;
  protected _basket: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._catalog = ensureElement<HTMLElement>('.gallery');
    this._counter = ensureElement<HTMLElement>('.header__basket-counter');
    this._basket = ensureElement<HTMLElement>('.header__basket');

    this._basket.addEventListener('click', () => {
      this.events.emit('basket:open');
  });
  }
  
  set catalog(items: HTMLElement[]) {
    this._catalog.replaceChildren(...items)
}

  set counter(value: number) {
    this.setText(this._counter, String(value))
  }

}