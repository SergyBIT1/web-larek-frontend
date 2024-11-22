import { createElement, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/events";

interface IBasketView {
  items: HTMLElement[];
  total: number;
  button: HTMLElement;
}

export class Basket extends Component<IBasketView> {
  protected _list: HTMLElement;
  protected _total: HTMLElement;
  protected _button: HTMLElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container)

    this._list = ensureElement<HTMLElement>('.basket__list', this.container);
    this._total = this.container.querySelector('.basket__price');
    this._button = this.container.querySelector('.basket__button');

    if (this._button) {
      this._button.addEventListener('click', () => {
          events.emit('basket:includeInOrder');
      });
  }

  this.list = [];

  }
  set list(items: HTMLElement[]) {
    if (items.length) {
      this._list.replaceChildren(...items);
  } else {
      this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
          textContent: 'Корзина пуста'
      }));
  }
}

  set total(value: number) {
    this.setText(this._total, `${value} синапсов`)
  }
  }
