import { IProduct } from '../../types';
import { IEvents } from '../base/Events';

export class Products {
  private items: IProduct[] = [];
  private selectedItem: IProduct | null = null;

  constructor(protected events: IEvents) {}

  // сохраняет массив товаров из параметров метода
  setItems(items: IProduct[]): void {
    this.items = items;
    this.events.emit('catalog:changed');
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
    this.events.emit('catalog:cardSelected');
  }

  // получает товар для подробного отображения
  getSelectedItem(): IProduct | null {
    return this.selectedItem;
  }
}
