import { IProduct } from "../../types";
import { Api, ApiListResponse } from "../base/api";

// интерфейс сервера
export interface ILarekApi {
  getProductList: () => Promise<IProduct[]>;
}

export class LarekApi extends Api implements ILarekApi {
  readonly cdn: string;

  constructor(baseUrl: string, cdn: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
}

  getProductList() {
    return this.get(`/product`)
    .then((data: ApiListResponse<IProduct>) =>{
    return data.items.map((item) => ({...item}) )
  })
}
}