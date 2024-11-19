import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

interface IPage {
  catalog: HTMLElement[];
}

export class PageUI extends Component<IPage> {
  protected _catalog: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._catalog = ensureElement<HTMLElement>('.gallery')
  }
  
  set catalog(items: HTMLElement[]) {
    this._catalog.replaceChildren(...items)
}
}