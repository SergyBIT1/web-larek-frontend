import { ICard } from "../../types";

export class CardModel {
  protected items: ICard[] = [];

  constructor() {}

  setProductList(data: ICard[]) {
    this.items = data;
  }

  getProductlist(): ICard[] {
    return this.items;
  }
}

const fakeArray = [
  {
    "id": "4175",
    "description": "Если планируете решать задачи в тренажёре, берите два.",
    "image": "/5_Dots.svg",
    "title": "+1 час в сутках",
    "category": "софт-скил",
    "price": 750
  }
]

const cardModel = new CardModel();
cardModel.setProductList(fakeArray)
console.log(cardModel.getProductlist())




// пробный набор для консоли

export interface ICar {
  model: string;
  year: number;
}

export class CarModel {
  protected items: ICar[] = [];
  
  constructor() {}

  set(data: ICar[]) {
    this.items = data;
  }
  get(): ICar[] {
    return this.items
  }
}

const carArray = [
  {
    'model': 'mercedes',
    'year': 1961
  }
  
]

const carModel = new CarModel();
carModel.set(carArray)
console.log(carModel.get())