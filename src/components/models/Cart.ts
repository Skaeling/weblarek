import { IProduct } from '../../types';
import { IEvents } from '../base/Events';

export class Cart {
  private list: IProduct[] = [];

    constructor(protected events: IEvents) {}
  

  //получает массив товаров, которые находятся в корзине
  getItems(): IProduct[] {
    return [...this.list];
  }

  // добавляет товар, который был получен в параметре, в массив корзины
  addProduct(product: IProduct): void {
    this.list.push(product);
    this.events.emit('cart:changed');

  }

  // удаляет товар, который был получен в параметре, из массива корзины.
  // В данном решении метод удалит два одинаковых товара за раз.
  removeProduct(product: IProduct): void {
    this.list = this.list.filter((item) => item.id !== product.id);
    this.events.emit('cart:changed');

  }

  // удаляет все товары из корзины
  clear(): void {
    this.list = [];
    this.events.emit('cart:changed');

  }

  // получает стоимость всех товаров в корзине
  getTotalPrice(): number {
    let total = 0;
    for (const item of this.list) {
      if (item.price !== null) {
        total += item.price;
      }
    }
    return total;
  }

  // получает количество всех товаров в корзине
  getTotalCount(): number {
    return this.list.length;
  }

  // проверяет наличия товара в корзине по его id, полученному в параметре метода
  hasItemById(itemId: string): boolean {
    return this.list.some((item) => item.id === itemId);
  }
}
