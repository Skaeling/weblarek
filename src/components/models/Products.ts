import { IProduct } from "../../types"

export class Products {

private _items: IProduct[] = [];
private _itemCard: IProduct | null = null;

// сохраняет массив товаров из параметров метода
  setItems(items: IProduct[]): void {
    this._items = items;
  }

// получает массив товаров из модели
  getItems(): IProduct[] {
    return this._items;

  }
// получает товар по его id
  getItemById(itemId: string) : IProduct | undefined {
    return this._items.find(item => item.id === itemId)
  }

// сохраняет товар для подробного отображения
  setItemCard(itemCard: IProduct): void {
    this._itemCard = itemCard
  }

  // получает товар для подробного отображения
  getItemCard(): IProduct | null {
    return this._itemCard;
  }

}