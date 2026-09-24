import { IProductsResponse, IOrderRequest, IApi, TOrderResponse, TOrderResponceError } from "../../types"


export class ApiService {
private api: IApi;

  constructor(Api: IApi) {
    this.api = Api;
  }

  getProducts(): Promise<IProductsResponse> {
    return this.api.get('/product/')

  }

  postOrder(data: IOrderRequest): Promise<TOrderResponse | TOrderResponceError> {
    return this.api.post('/order/', data, 'POST') 

  }

}