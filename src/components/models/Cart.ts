import { IProduct } from '../../types';

export class Cart {
  private list: IProduct[] = [];

  //получает массив товаров, которые находятся в корзине
  getItems(): IProduct[] {
    return [...this.list];
  }

  // добавляет товар, который был получен в параметре, в массив корзины
  addProduct(product: IProduct): void {
    this.list.push(product);
  }

  // удаляет товар, который был получен в параметре, из массива корзины.
  // В данном решении метод удалит два одинаковых товара за раз.
  removeProduct(product: IProduct): void {
    this.list = this.list.filter((item) => item.id !== product.id);
  }

  // удаляет все товары из корзины
  clear(): void {
    this.list = [];
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
