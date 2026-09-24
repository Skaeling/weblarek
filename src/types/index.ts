export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export enum EPaymentMethod {
    Card = 'card',
    Cash = 'cash',
}

export type TPayment = EPaymentMethod | null

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}

export type TValidationErrors = Partial<Record<keyof IBuyer, string>>

export interface IProductsResponse {
    "total": number,
    "items": IProduct[]
}

export interface IOrderRequest extends IBuyer {
    "total": number,
    "items": IProduct['id'][]
}

export type TOrderResponse = {
    "id": string,
    "total": number
}

export type TOrderResponceError = {
    "error": string
}