import { FormErrors, IOrderBasket, IProduct, IUser } from '../types';
import { Model } from './base/Model';
import { IEvents } from './base/events';

export class ModelProduct extends Model<IProduct> {
	items: IProduct[] = []; // массив для вывода карточек
	preview: string; // просмотр товара, при клике на карточку
	basket: IProduct[] = []; // хранение заказов в корзине
	userData: IUser = {}; // хранение данных пользователя
	formErrors: FormErrors = {}; // хранение ошибок валидации

	constructor(data: Partial<IProduct>, events: IEvents) {
		super(data, events);
		this.userData = {
			address: '',
			email: '',
			phone: '',
			payment: '',
		};
	}

	// добавление массива в модель
	setProductList(cards: IProduct[]) {
		this.items = cards;
		this.events.emit('items:changed');
	}

	// получение массива с товарами
	getProductlist(): IProduct[] {
		return this.items;
	}

	// подробный просмотр карточки с товаром
	setPreview(card: IProduct) {
		this.preview = card.id;
		this.events.emit('preview:changed', card);
	}

	isProductInBasket(id: string): boolean {
		return this.basket.some((item) => item.id === id);
	}

	getQuantityFromBasket() {
		return this.basket.length;
	}

	addToBasket(id: string): void {
		this.basket.push(this.getIdCard(id));
		this.events.emit('basket:changed', this.basket);
	}

	getIdCard(id: string): IProduct {
		return this.items.find((item) => item.id === id);
	}

	getAllPrice() {
		return this.basket.reduce((aсс, item) => aсс + item.price, 0);
	}

	deleteFromBasket(id: string) {
		this.basket = this.basket.filter((item) => item.id !== id);
		this.events.emit('basket:changed', this.basket);
	}

	clearBasketData() {
		this.basket = [];
		this.events.emit('basket:changed', this.basket);
	}

	getBasketData(): IProduct[] {
		return this.basket;
	}

	//метод получения списка ID товаров в корзине
	getIdProductsFromBasket() {
		return this.basket.map((item) => item.id);
	}

	// данные о пользователе
	getUserProfile() {
		return this.userData;
	}

	//метод очистки корзины после заказа
	clearUserData() {
		this.userData = {
			payment: '',
			address: '',
			email: '',
			phone: '',
		};
		this.formErrors = {};
		this.events.emit('input:error', this.formErrors);
	}

	//метод валидации формы с полями ввода addreess, email, phone
	validateContact(): boolean {
		const errors: typeof this.formErrors = {};

		if (!this.userData.address) {
			errors.address = 'Необходимо указать адрес';
		}
		if (!this.userData.payment) {
			errors.payment = 'Необходимо указать способ оплаты';
		}
		if (!this.userData.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.userData.phone) {
			errors.phone = 'Необходимо указать номер телефона';
		}
		this.formErrors = errors;
		this.events.emit('input:error', this.formErrors);

		return Object.keys(errors).length === 0;
	}

	//метод для заполнения полей с контактными данными пользователя
	fillUserContacts(field: keyof IUser, value: string): void {
		this.userData[field] = value;
		if (this.validateContact()) {
			this.events.emit('order:ready', this.userData);
		}
	}

	//метод получения ошибок формы
	getFormErrors() {
		return this.formErrors;
	}

	//метод получения полей c выбором типа оплаты
	getFieldPayment() {
		return this.userData.payment;
	}
}
