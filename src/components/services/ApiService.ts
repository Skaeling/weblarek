import {
  IProductsResponse,
  IOrderRequest,
  IApi,
  TOrderResponse,
} from '../../types';

export class ApiService {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  getProducts(): Promise<IProductsResponse> {
    return this.api.get<IProductsResponse>('/product/');
  }

  postOrder(data: IOrderRequest): Promise<TOrderResponse> {
    return this.api.post<TOrderResponse>('/order/', data);
  }
}
