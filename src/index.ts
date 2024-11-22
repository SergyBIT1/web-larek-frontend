import './scss/styles.scss';
import { LarekApi } from './components/common/LarekApi';
import { ModelProduct } from './components/ModelProduct';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { Page } from './components/Page';
import { CardOnPage, CardPreview, IndexCard } from './components/Card';
import { CategoryType, IProduct } from './types';
import { Modal } from './components/common/Modal';
import { Basket } from './components/common/Basket';
import { Order } from './components/base/Order';

const events = new EventEmitter();
const api = new LarekApi(API_URL, CDN_URL)

// модель данных приложения
const model = new ModelProduct({}, events)

// шаблоны
const catalogCardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog'); // каталог карточек
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview'); //предпросмотр карточки
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket'); //модальное окно корзины
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket'); //наименование товара в корзине

// основные контейнеры
const page = new Page(document.body, events)
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate<HTMLFormElement>(orderTemplate), events);

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
events.on('preview:change', (item: IProduct) => {
	const productInBasket = model.isProductInBasket(item.id)
	const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
      if (productInBasket) {
        events.emit('basket:delete', item)
      } else {
        events.emit('card:toBasket', item)
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
      content:
          basket.render({
          })
  });
});

// начало оформления заказа, кнопка "Оформить"
events.on('basket:includeInOrder', () => {

	// очищаем форму и данные перед новым заказом
	const userInfo = model.getUserInfo(); //из модели получаю данные пользователя

	// model.clearUser();
	modal.render({
		content: order.render({
			valid: false,
			errors: [],
			address: userInfo.address,
			payment: userInfo.payment,
		}),
	});
});

// добавление в корзину, кнопка "В корзину"
events.on('card:toBasket', (item: IProduct) => {
  model.addToBasket(item.id)
})

// изменение состояния корзины
events.on('card:addToBasket', () => {
	
	// page.counter = model.getCountsInBasket();
	// basket.total = model.getAllPrice();
	basket.list =
   model.getBasket().map((item, index) => {
		const cardBasket = new IndexCard(cloneTemplate(cardBasketTemplate), {
			onClick: () => events.emit('basket:delete', item),
		});
		
		return cardBasket.render({
			price: item.price,
			title: item.title,
			// index: index + 1,
		});
	});
});


api
.getProductData()
.then(model.setProductList.bind(model))
.catch((error) => {
  console.log(error)
}
)
// console.log(api.getProductData())




