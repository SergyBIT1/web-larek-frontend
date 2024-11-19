
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