import { IProductsResponse, IOrderRequest, IApi, TOrderResponse } from "../../types"



export class ApiService {
private api: IApi;

  constructor(Api: IApi) {
    this.api = Api;
  }

  getProducts(): Promise<IProductsResponse> {
    return this.api.get('/product/')

  }

  postOrder(data: IOrderRequest): Promise<TOrderResponse> {
    return this.api.post('/order/', data, 'POST') 

  }

}