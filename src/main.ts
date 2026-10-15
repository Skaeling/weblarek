import './scss/styles.scss';
import { apiProducts, mockUserFull, mockUserPart } from './utils/data';
import { Products } from './components/models/Products';
import { Cart } from './components/models/Cart';
import { Buyer } from './components/models/Buyer';
import { Api } from './components/base/Api';
import { ApiService } from './components/services/ApiService';
import { API_URL, CDN_URL } from './utils/constants';
import { CardCatalog } from './components/views/CardCatalog';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Header } from './components/views/Header';
import { Gallery } from './components/views/Gallery';
import { OrderForm } from './components/views/OrderForm';
import { Modal } from './components/views/Modal';
import { EventEmitter } from './components/base/Events';
import { ContactsForm } from './components/views/ContactsForm';
import { CardPreview } from './components/views/CardPreview';
import { Basket } from './components/views/Basket';
import { CardBasket } from './components/views/CardBasket';
import { OrderSuccess } from './components/views/OrderSuccess';
import { IProduct } from './types';

const events = new EventEmitter();

// создаем модели 
const products = new Products(events);
const cart = new Cart(events)
const buyer = new Buyer(events)

// создаем статичные компоненты 
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'))
const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'))
const header = new Header(ensureElement<HTMLElement>('.header'), {
  onCartClick: () => events.emit('headerBasket:selected')})

events.onAll(({ eventName }) => console.log('Событие', eventName))

// функция рендера preview карточки
function renderPreview(item: IProduct) {
  const isInCart = cart.hasItemById(item.id)
  modal.render({
    content: new CardPreview(cloneTemplate<HTMLElement>('#card-preview'), {
      onAction: () => events.emit('preview:changed', item)
    }).render({
      title: item.title,
      text: item.description,
      price: item.price,
      category: item.category,
      image: CDN_URL + item.image,
      buttonText: isInCart ? 'Удалить из корзины' : 'В корзину'
      
    })})
}

// функция рендера preview корзины
function renderBasket() {
  const orderCards = cart.getItems().map((item, index) =>
  new CardBasket(cloneTemplate<HTMLElement>('#card-basket'), {onRemove: () => events.emit('basket:itemRemoved', item),}).render(
    {...item,
    index: String(index + 1)}
  ))
  modal.render({content: new Basket(cloneTemplate<HTMLElement>('#basket'), {
    onOrder: () => events.emit('order:added'),

  }).render({list: orderCards, price: cart.getTotalPrice()})
})
}

// Каталог изменился → забрать товары у модели и перерисовать карточки.
events.on('catalog:changed', () => {
  const cards = products.getItems().map((item) =>
    new CardCatalog(cloneTemplate<HTMLElement>('#card-catalog'), {
      onClick: () => events.emit('card:selected', item),
    }).render({
      title: item.title,
      price: item.price,
      category: item.category,
      image: CDN_URL + item.image
    })
  );

  gallery.render({ catalog: cards });
});

// выбрана корзина -> запрашиваем из модели cart -> отрисовываем modal Basket
events.on('headerBasket:selected', () => {
  renderBasket();
})


// выбрана конкретная карточка -> обновляем модель products
events.on('card:selected', (item: IProduct) => {
  products.setSelectedItem(item)
  renderPreview(item);
});

// карточка добавлена/удалена в/из корзины -> обновляем модель Cart и preview.
events.on('preview:changed', () => {
  const item = products.getSelectedItem()
  if (!item) {
    return;
  }
  if (cart.hasItemById(item.id)) {
    cart.removeProduct(item)}
  else {
    cart.addProduct(item);
  }

  renderPreview(item)
});

// удаление товара из корзины 
events.on('basket:itemRemoved', (item: IProduct) => {
  cart.removeProduct(item);
  renderBasket()

})


// корзина изменена  -> обновляем counter
events.on('cart:changed', () => {
  header.render({counter: cart.getTotalCount()})
  });

// В Моделях данных:
// изменение каталога товаров +
// изменение выбранного для просмотра товара +
// изменение содержимого корзины +
// изменение данных покупателя

// В Представлениях:
// выбор карточки для просмотра +
// нажатие кнопки покупки товара + 
// нажатие кнопки удаления товара из корзины +
// нажатие кнопки открытия корзины +
// нажатие кнопки оформления заказа 
// нажатие кнопки перехода ко второй форме оформления заказа
// нажатие кнопки оплаты/завершения оформления заказа
// изменение данных в формах

// Запрос к серверу за объектом с данными каталога.
const api = new Api(API_URL);
const apiService = new ApiService(api);

try {
  const productsApi = await apiService.getProducts();
  console.log(`Объект с сервера с данными каталога`, productsApi);
  
  // Сохранение массива в модели данных и вывод массива в консоль.
  products.setItems(productsApi.items);
  console.log(`Массив продуктов из модели Products`, products.getItems());
} catch (error) {
  console.error('Ошибка загрузки каталога', error);
}
