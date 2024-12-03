import { IOrderResponse, IProduct } from '../../types';
import { Api, ApiListResponse } from '../base/api';

export class LarekApi extends Api {
	readonly cdn: string;

	constructor(baseUrl: string, cdn: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProductData(): Promise<IProduct[]> {
		return this.get(`/product`).then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
			}))
		);
	}

	orderResponse(order: IOrderResponse) {
		return this.post('/order', order).then((data: IOrderResponse) => data);
	}
}
