import './scss/styles.scss';
import { LarekApi } from './components/common/LarekApi';
import { ModelProduct } from './components/ModelProduct';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { Page } from './components/Page';
import { CardOnPage, CardPreview, IndexCard } from './components/Card';
import {
	CategoryType,
	IOrderBasket,
	IOrderResponse,
	IProduct,
	IUser,
} from './types';
import { Modal } from './components/common/Modal';
import { Basket } from './components/common/Basket';
import { Order } from './components/Order';
import { Contacts } from './components/Contacts';
import { ISuccess, Success } from './components/common/Success';

const events = new EventEmitter();
const api = new LarekApi(API_URL, CDN_URL);

// модель данных приложения
const model = new ModelProduct({}, events);

// шаблоны
const catalogCardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog'); // каталог карточек
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview'); //предпросмотр карточки
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket'); //модальное окно корзины
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket'); //наименование товара в корзине
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// основные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate<HTMLFormElement>(orderTemplate), events);
const contacts = new Contacts(
	cloneTemplate<HTMLFormElement>(contactsTemplate),
	events
);
const success = new Success(cloneTemplate(successTemplate), {
	onClick: () => {
		modal.close();
	},
});

// вывод массива карточек в отображение
events.on('items:changed', () => {
	page.catalog = model.getProductlist().map((item) => {
		const card = new CardOnPage(cloneTemplate(catalogCardTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			id: item.id,
			title: item.title,
			category: item.category as CategoryType,
			image: api.cdn + item.image,
			price: item.price,
		});
	});
});

// клик пользователя по карте
events.on('card:select', (item: IProduct) => {
	model.setPreview(item);
});

// отображение предпросмотра карточки
events.on('preview:changed', (item: IProduct) => {
	const productInBasket = model.isProductInBasket(item.id);
	const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			if (productInBasket) {
				// events.emit('basket:delete', item)
			} else {
				events.emit('card:toBasket', item);
			}
			modal.close();
		},
	});

	modal.render({
		content: cardPreview.render({
			id: item.id,
			title: item.title,
			price: item.price,
			category: item.category as CategoryType,
			image: api.cdn + item.image,
			description: item.description,
		}),
	});
});

// открыть корзину
events.on('basket:open', () => {
	modal.render({
		content: basket.render({}),
	});
});

// добавление в корзину, кнопка "В корзину"
events.on('card:toBasket', (item: IProduct) => {
	model.addToBasket(item.id);
});

//удаление товара из корзины
events.on('basket:delete', (item: IProduct) => {
	model.deleteFromBasket(item.id);
});

// изменение состояния корзины
events.on('basket:changed', () => {
	page.counter = model.getQuantityFromBasket();
	basket.total = model.getAllPrice();
	basket.list = model.getBasketData().map((item, index) => {
		const cardBasket = new IndexCard(cloneTemplate(cardBasketTemplate), {
			onClick: () => events.emit('basket:delete', item),
		});

		return cardBasket.render({
			price: item.price,
			title: item.title,
			index: index + 1,
		});
	});
});

// начало оформления заказа, кнопка "Оформить"
events.on('basket:includeInOrder', () => {
	const userInfo = model.getUserProfile(); 
	model.clearUserData();
	modal.render({
		content: order.render({
			valid: false,
			errors: [],
			address: userInfo.address,
			payment: userInfo.payment,
		}),
	});
});

// Изменение текста ошибок
events.on('input:error', (errors: Partial<IUser>) => {
	handleErrors(errors);
	updateUserData(errors);
});

// валидация что два поля заполнены
function handleErrors(errors: Partial<IUser>) {
	const { payment, address, email, phone } = errors;
	order.valid = !payment && !address;
	contacts.valid = !email && !phone;
	order.errors = Object.values({ address, payment })
		.filter((i) => !!i)
		.join('; ');
	contacts.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
}

function updateUserData(_errors: Partial<IUser>) {
	order.payment = model.getFieldPayment();
}

//валидация формы
events.on('input:validate', (data: { field: keyof IUser; value: string }) => {
	model.fillUserContacts(data.field, data.value);
});

//событие отправки формы
events.on('order:submit', () => {
	modal.render({
		content: contacts.render({
			valid: false,
			errors: [],
		}),
	});
});

events.on('contacts:submit', () => {
	const orderInfo = model.getUserProfile();
	const items = model.getIdProductsFromBasket();
	const payload: IOrderResponse = {
		payment: orderInfo.payment,
		address: orderInfo.address,
		email: orderInfo.email,
		phone: orderInfo.phone,
		total: model.getAllPrice(),

		items: items,
	};

	api
		.orderResponse(payload)
		.then((result) => {
			events.emit('order:success', result);
			model.clearBasketData();
		})
		.catch((error) => {
			console.error('Ошибка отправки заказа:', error);
		});
});

// успешная отправка заказа
events.on('order:success', (result: ISuccess) => {
	modal.render({
		content: success.render({
			total: result.total,
		}),
	});
	model.clearBasketData();
});

// блокировка прокрутки страницы при открытом модальном окне
events.on('modal:open', () => {
	page.locked = true;
});

// разблокировка прокрутки
events.on('modal:close', () => {
	page.locked = false;
});

api
	.getProductData()
	.then(model.setProductList.bind(model))
	.catch((error) => {
		console.log(error);
	});
