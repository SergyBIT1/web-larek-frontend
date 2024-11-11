

// слой Model

class Model<T> {
  constructor(data: Partial<T>, protected events: IEvents) {
      Object.assign(this, data);
  }
  


// слой View


class CardUI <T> extends Component<ICard<T>> {
  _description?: HTMLElement;
  _image?: HTMLImageElement;
  _title: HTMLElement;
  _category: HTMLElement;
  _price: HTMLElement;
  _button?: HTMLButtonElement;

   constructor(blockName: string, container: HTMLElement, actions?: ICardActions) {
       super(container);
}
}

class GalleryUI extends Component<ICardList> {
    _cardlist: HTMLElement;

   constructor(container: HTMLElement, events: IEvents) {
       super(container);
} 
}
   
class PageUI<T> extends Component<IPage> {
    _logo: HTMLElement;
    _gallery: HTMLElement;
    _basket: HTMLElement;

   constructor(container: HTMLElement, events: IEvents) {
       super(container);
} 
}
   
class BasketUI extends Component<IBasket> {
   _cardlist: HTMLElement;
   _total: HTMLElement;
   _button: HTMLElement;

  constructor(container: HTMLElement, events: EventEmitter) {
       super(container);
}
}

class ModalUI extends Component<IModal> {
 _closeButton: HTMLButtonElement;
 _content: HTMLElement;
 
 constructor(container: HTMLElement, events: IEvents) {
   set content(value: HTMLElement) {}
   open() {}
   close() {}
   render(data: IModal): HTMLElement {}
}
}

class SuccessUI extends Component<ISuccess> {
   _close: HTMLElement;

   constructor(container: HTMLElement, actions: ISuccessActions) {
       super(container);
       }
}

class OrderUI extends Component<IOrderForm> {
   _email: string;
   _phone: string;
 constructor(container: HTMLElement, events: EventEmitter) {
       super(container);
}
}

class ContactsUI extends Component<IOrderForm> {
   _email: string;
   _phone: string;
 constructor(container: HTMLElement, events: EventEmitter) {
       super(container);
}
}

// интерфейсы

type OrderStatus = 'wait' | 'active' | 'closed';

interface ICard<T> {
		id: string;
		description?: string | string[];
		image: string;
		title: string;
    category: string;
    price: number;
}

interface ICardList {
 total: number,
 cardlist: HTMLElement[],
 price: number
}

interface IPage {
		logo: HTMLElement[];
    basket: HTMLElement[];
    gallery: HTMLElement[];
}

interface IBasket {
	cardlist: HTMLElement[];
  total: number; 
}

interface IModal {
    content: HTMLElement;
}

interface ISuccess {
    total: number;
}

interface IOrderForm {
	email: string;
  phone: string;
}

interface ISuccessActions {
	 onClick: () => void;
}

interface IEvents {
    on<T extends object>(): void;
    emit<T extends object>(): void;
    trigger<T extends object>(): void;
}

interface IAPI {
		getCardList: () => Promise<ICard[]>;
    getCard: (id: string) => Promise<ICard>;
    getCardUpdate: (id: string) => Promise<CardUpdate>;
    
}