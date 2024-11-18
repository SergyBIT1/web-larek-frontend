import './scss/styles.scss';
import { LarekApi } from './components/common/LarekApi';
import { ModelProduct } from './components/ModelApp';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';

const events = new EventEmitter();
const api = new LarekApi(API_URL, CDN_URL)
const model = new ModelProduct({}, events)

api
.getProductList()
.then(model.setProductList.bind(model))
.catch((error) => {
  console.log(error)
}
)
console.log(api.getProductList())




