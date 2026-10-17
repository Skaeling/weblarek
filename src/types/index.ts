import { categoryMap } from '../utils/constants';

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods
  ): Promise<T>;
}

export type TPayment = 'card' | 'cash';

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IBuyer {
  payment: TPayment | null;
  email: string;
  phone: string;
  address: string;
}

export type TValidationErrors = Partial<Record<keyof IBuyer, string>>;

export interface IProductsResponse {
  total: number;
  items: IProduct[];
}

export interface IOrderRequest extends Omit<IBuyer, 'payment'> {
  payment: TPayment;
  total: number;
  items: IProduct['id'][];
}

export type TOrderResponse = {
  id: string;
  total: number;
};

export type TCategory = keyof typeof categoryMap;

export interface IBasket {
  list: HTMLElement[];
  price: number;
  valid: boolean;
}

export interface IBasketActions {
  onOrder: () => void;
}

export type TCard = Pick<IProduct, 'title' | 'price'>;

export interface ICardBasket {
  index: number;
}

export interface ICardBasketActions {
  onRemove: () => void;
}

export interface ICardCatalog extends Pick<IProduct, 'image' | 'category'> {}

export interface ICardCatalogActions {
  onClick: () => void;
}

export interface ICardPreview extends ICardCatalog {
  text: string;
  buttonText: string;
  valid: boolean;
}

export interface ICardPreviewActions {
  onAction: () => void;
}

export type TContactsForm = Pick<IBuyer, 'email' | 'phone'>;

export interface IForm {
  errors: TValidationErrors;
  valid: boolean;
}

export interface ICatalog {
  catalog: HTMLElement[];
}

export interface IHeader {
  counter: number;
}

export interface IHeaderActions {
  onCartClick: () => void;
}

export interface IModalData {
  content: HTMLElement;
}

export type TOrderForm = Pick<IBuyer, 'payment' | 'address'>;

export interface IOrderSuccess {
  total: number;
}

export interface IOrderSuccessActions {
  onClose: () => void;
}

export type TBuyerChange = { field: keyof IBuyer; value: string };
