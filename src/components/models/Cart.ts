import { IProduct } from "../../types";

//подумать над единым наименованием методов продукт против айтемс 
//подумать над работой filter в удалении товара - сейчас удалит оба одинаковых 

export class Cart {
  private _list : IProduct[] = []

//сохраняет массив товаров, которые находятся в корзине
  setItems(items: IProduct[]): void {
    this._list = items;
  }

  getItems(): IProduct[] {
    return this._list
  }

  // добавляет товар, который был получен в параметре, в массив корзины
  setProduct(product: IProduct): void {
    this._list.push(product)
  }

  // удаляет товар, который был получен в параметре, из массива корзины
  delProduct(product: IProduct): void {
    this._list = this._list.filter(item => item.id !== product.id);
  }

  // удаляет все товары из корзины
  clear(): void {
    this._list = [];
  }

  // получает стоимость всех товаров в корзине
  getTotalPrice(): number {
    let total = 0
    for (const item of this._list) {
      if (item.price !== null)
        {total += item.price}
    }
    return total
  }

  // получает количество всех товаров в корзине
  getTotalCount(): number {
    return this._list.length
  }

  // проверяет наличия товара в корзине по его id, полученному в параметре метода
  getItemById(itemId: string): IProduct | undefined {
    return this._list.find(item => item.id === itemId)

  }
}