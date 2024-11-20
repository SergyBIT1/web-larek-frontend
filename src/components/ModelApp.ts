import { IProduct } from "../types";
import { Model } from "./base/Model";
import { IEvents } from "./base/events";


export class ModelProduct extends Model<IProduct>{
  protected items: IProduct[] = [];

  constructor(data: Partial<IProduct>, events: IEvents) {
    super(data, events)
  }

  // добавление массива в модель
  setProductList(data: IProduct[]) {
    this.items = data;
    this.events.emit('items:changed')
  }

  // получение массива с товарами
  getProductlist(): IProduct[] {
    return this.items;
  }
}