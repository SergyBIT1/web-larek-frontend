
// модель для хранения товаров в каталоге
export interface IProductData {
  catalog: IProduct[];
}

// данные о товаре
export interface IProduct {
  id: string;
  description?: string | string[];
  image: string;
  title: string;
  category: string;
  price: number;
}  

export interface IUser {
  address?: string;
  email?: string;
  phone?: string;
  payment?: string;
}

export interface IOrderForm {
  address: string;
  email: string;
  phone: string;
  payment: string;
}


// ошибки в формах
export type FormErrors = Partial<Record<keyof IUser, string>>;

//  категории товаров
export type CategoryType =
	| 'другое'
	| 'софт-скил'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

export type CategoryList = {
  [Key in CategoryType]: string;
};

// модель данных
export interface IModelProduct {
  setProductList(data: IProduct[]): void; // метод добавленгия каталога с товарами , массива
  getProductList(): IProduct[]
}

export interface IOrderResult {
  id: string;
}

// Данные о заказе
export interface IOrderResponse extends IUser {
	items: string[]; 
	total: number;
}

export interface IOrderForm {
  email: string;
  phone: string;
}

export interface IOrder extends IOrderForm {
  items: string[]
}

export interface IForm {
  valid: boolean;
  errors: string[];
}