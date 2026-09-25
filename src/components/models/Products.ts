import { IProduct } from '../../types';

export class Products {
  private items: IProduct[] = [];
  private selectedItem: IProduct | null = null;

  // сохраняет массив товаров из параметров метода
  setItems(items: IProduct[]): void {
    this.items = items;
  }

  // получает массив товаров из модели
  getItems(): IProduct[] {
    return [...this.items];
  }

  // получает товар по его id
  getItemById(itemId: string): IProduct | undefined {
    return this.items.find((item) => item.id === itemId);
  }

  // сохраняет товар для подробного отображения
  setSelectedItem(itemCard: IProduct): void {
    this.selectedItem = itemCard;
  }

  // получает товар для подробного отображения
  getSelectedItem(): IProduct | null {
    return this.selectedItem;
  }
}
