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

  constructor(protected blockName:string, container: HTMLElement) {
    super(container)
    this._title = ensureElement<HTMLElement>(`.${blockName}__title`, this.container)
    this._price = ensureElement<HTMLElement>(`.${blockName}__price`, this.container)
    this._button = container.querySelector(`.${blockName}__button`)
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
    super('.card', container);

    this._image = ensureElement<HTMLImageElement>('.card__image', container);
    this._category = ensureElement<HTMLElement>('.card__category')
  }

  set image(value: string) {
    this.setImage(this._image, value, this.title)
  }

  set category(value: CategoryType) {
    this.setText(this._category, value);
    this.toggleClass(this._category, categoryList[value], true)
  }
}