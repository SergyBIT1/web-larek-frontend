import { ICard } from "../../types";
import { Api, ApiListResponse } from "../base/api";

export interface ILarekApi {
  getProductlist: () => Promise<ICard[]>;
}

export class LarekApi extends Api implements ILarekApi {
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
}

  getProductlist() {
    return this.get(`/product`)
    .then((data: ApiListResponse<ICard>) =>{
    return data.items.map((item) => ({...item}) )
  })
}
}