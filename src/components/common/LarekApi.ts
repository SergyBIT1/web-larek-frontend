import { IOrder, IOrderResponse, IOrderResult, IProduct } from "../../types";
import { Api, ApiListResponse } from "../base/api";

// интерфейс сервера
export interface ILarekApi {
  getProductData: (id: string) => Promise<IProduct[]>;
  getProductById: (id: string) => Promise<IProduct>;
  orderResponse: (order: IOrder) => Promise<IOrderResult>;
}

export class LarekApi extends Api implements ILarekApi {
  readonly cdn: string;

  constructor(baseUrl: string, cdn: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
}

  getProductData(): Promise<IProduct[]> {
    return this.get(`/product`)
  .then((data: ApiListResponse<IProduct>) =>
              data.items.map((item) => ({
                  ...item,
                  // image: this.cdn + item.image
        }))
    )
      }

// метод получения одного товара по id  
  getProductById(id: string): Promise<IProduct> {
    return this.get(`/product/${id}`).then(
        (item: IProduct) => ({
            ...item,
            image: this.cdn + item.image,
        })
    );
  }

  orderResponse(order: IOrder): Promise<IOrderResult> {
    return this.post('/order', order).then(
        (data: IOrderResult) => data
    );
  }
  }