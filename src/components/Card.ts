import { CategoryType, IProduct } from "../types";
import { categoryList } from "../utils/constants";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

export interface ICardActions {
  onClick: (event: MouseEvent) =>void;
}

export class CardUI extends Component<IProduct> {
  protected _title: HTMLElement;
  protected _price: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container)
    this._title = ensureElement<HTMLElement>('.card__title', this.container)
    this._price = ensureElement<HTMLElement>('.card__price', this.container)
    this._button = container.querySelector('.card__button')

  }
  
  set title(value:string) {
    this.setText(this._title, value)
  }
}

// класс для отображения карточки на странице
export class CardOnPage extends CardUI {
  _image: HTMLImageElement;
  _category: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this._image = ensureElement<HTMLImageElement>('.card__image', container);
    this._category = ensureElement<HTMLElement>('.card__category', container)
  }

  set image(value: string) {
    this.setImage(this._image, value, this.title)
  }

  set category(value: CategoryType) {
    this.setText(this._category, value);
    this.toggleClass(this._category, categoryList[value], true)
  }
}

// класс для подробного отображения карточки
export class CardPreview extends CardOnPage {
  _description: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container, actions)

    this._description = ensureElement<HTMLElement>('.card__text', container)
  }

  set description(value:string) {
    this.setText(this._description, value)
  }
}