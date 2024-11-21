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
  
}