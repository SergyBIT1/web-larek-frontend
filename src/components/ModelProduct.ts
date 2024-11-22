import { FormErrors, IOrderForm, IProduct, IUser } from "../types";
import { Model } from "./base/Model";
import { IEvents } from "./base/events";


export class ModelProduct extends Model<IProduct>{
  items: IProduct[] = []; // массив для вывода карточек
  preview: string; // просмотр товара, при клике на карточку
  basket: IProduct[] = []; // хранение заказов в корзине
  userData: IUser = {}; // хранение данных пользователя
  orderFormError: FormErrors = {} // хранение ошибок валидации

  constructor(data: Partial<IProduct>, events: IEvents) {
    super(data, events);
    this.userData = {
      address: '',
      email: '',
      phone: '',
      payment: ''
    }
  }

  // добавление массива в модель
  setProductList(cards: IProduct[]) {
    this.items = cards;
    this.events.emit('items:changed')
  }

  // получение массива с товарами
  getProductlist(): IProduct[] {
    return this.items;
  }

  // подробный просмотр карточки с товаром
  setPreview(card: IProduct) {
    this.preview = card.id;
    this.events.emit('preview:change', card);
  }

  // стоимость товаров в корзине
  getTotal() {
    return this.basket.reduce((a, c) => a + c.price, 0)
}

  isProductInBasket(id: string): boolean {
    return this.basket.some((item) => item.id === id);
  }

  getQuantityInBasket(){
    return this.basket.length;
  }

  addToBasket(id: string): void {
    this.basket.push(this.getIdCard(id));
    this.events.emit('basket:change', this.basket)
  }

  getIdCard(id: string): IProduct {
    return this.items.find((item) => item.id === id);
  }

  clearBasket() {
    this.basket = []
    this.events.emit('basket:change', this.basket)
    }

  getBasket(): IProduct[] {
    return this.basket
  }

    // данные о пользователе
	getUserInfo() {
		return this.userData;
	}
}
  
