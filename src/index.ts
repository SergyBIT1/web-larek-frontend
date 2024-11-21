import './scss/styles.scss';
import { LarekApi } from './components/common/LarekApi';
import { ModelProduct } from './components/ModelProduct';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { PageUI } from './components/Page';
import { CardOnPage, CardPreview } from './components/Card';
import { CategoryType, IProduct } from './types';
import { Modal } from './components/common/Modal';

const events = new EventEmitter();
const api = new LarekApi(API_URL, CDN_URL)

// модель данных приложения
const model = new ModelProduct({}, events)

// шаблоны
const catalogCardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog'); // каталог карточек
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview'); //предпросмотр карточки

// основные контейнеры
const page = new PageUI(document.body, events)
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

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
	
	const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
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



api
.getProductData()
.then(model.setProductList.bind(model))
.catch((error) => {
  console.log(error)
}
)
// console.log(api.getProductData())




