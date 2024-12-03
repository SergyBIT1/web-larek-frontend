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
	index?: number;
}

export interface IUser {
	address?: string;
	email?: string;
	phone?: string;
	payment?: string;
}

export interface IOrderBasket {
	list: HTMLElement[];
	total: number;
}

export interface IOrderForm {
	address: string;
	email: string;
	phone: string;
	payment: string;
}

// Данные о заказе
export interface IOrderResponse extends IUser {
	items: string[];
	total: number;
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
	setProductList(data: IProduct[]): void;
	getProductList(): IProduct[];
	setPreview(card: IProduct[]): void;
	getTotal(): void;
	isProductInBasket(id: string): boolean;
	getQuantityInBasket(): number;
	addToBasket(id: string): void;
	getIdCard(id: string): void;
	getIdProductsFromBasket(id: string): void;
	getAllPrice(): void;
	deleteFromBasket(id: string): void;
	clearBasketData(): void;
	getBasketData(): IProduct[];
	getUserProfile(): void;
	clearUserData(): void;
	validateContact(): boolean;
	fillUsercontacts(): void;
	getFormErrors(): Partial<Record<keyof IUser, string>>;
	getFieldPayment(): string;
}

export interface IForm {
	valid: boolean;
	errors: string[];
}

//тип определения способа оплаты
export type PaymentMethod = 'cash' | 'online' | null;
