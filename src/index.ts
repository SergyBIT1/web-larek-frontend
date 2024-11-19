import './scss/styles.scss';
import { LarekApi } from './components/common/LarekApi';
import { ModelProduct } from './components/AppData';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { PageUI } from './components/Page';
import { CardOnPage } from './components/Card';
import { CategoryType } from './types';

const events = new EventEmitter();
const api = new LarekApi(API_URL, CDN_URL)

// модель данных приложения
const model = new ModelProduct({}, events)

// шаблоны
const catalogCardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog'); // каталог карточек

// основные контейнеры
const page = new PageUI(document.body, events)

// изменились элементы каталога
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



api
.getProductData()
.then(model.setProductList.bind(model))
.catch((error) => {
  console.log(error)
}
)
// console.log(api.getProductData())




