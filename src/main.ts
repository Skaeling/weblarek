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

// const preview = new CardPreview(cloneTemplate<HTMLElement>('#card-preview'), {
//       onAdd: () => events.emit('card:added')})

events.onAll(({ eventName }) => console.log('Событие', eventName))



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

events.on('headerBasket:selected', () => {
  const orderCards = cart.getItems().map((item) =>
  new CardBasket(cloneTemplate<HTMLElement>('#card-basket'), {onRemove: () => events.emit('basket:changed'),}).render(
    {index: item}
  ))
  modal.render({content: new Basket(cloneTemplate<HTMLElement>('#basket'), {
    onOrder: () => events.emit('order:added'),

  }).render({list: order})
})
})


// была выбрана конкретная карточка
events.on('card:selected', (item: IProduct) => {
  modal.render({
    content: new CardPreview(cloneTemplate<HTMLElement>('#card-preview'), {
      onAdd: () => events.emit('card:added', item)
    }).render({
      title: item.title,
      description: item.description,
      price: item.price,
      category: item.category,
      image: CDN_URL + item.image
    }),
  });
});


// карточка добавлена в корзину -> обновляем корзину, хедер, и саму карточку.

events.on('card:added', (item: IProduct) => {
  cart.addProduct(item);
  header.render({counter: cart.getTotalCount()})
  modal.render({
    content: new CardPreview(cloneTemplate<HTMLElement>('#card-preview'), {
      onAdd: () => events.emit('card:added', item)
    }).render({
      title: item.title,
      description: item.description,
      price: item.price,
      category: item.category,
      image: CDN_URL + item.image,
      buttonText: 'Удалить из корзины'
      
    }),
  });
});

// Корзина изменилась → .

events.on('cart:changed', () => {

})
  ;

//   header.render({ catalog: cards });
// });

// В Моделях данных:
// изменение каталога товаров +
// изменение выбранного для просмотра товара +
// изменение содержимого корзины
// изменение данных покупателя

// В Представлениях:
// выбор карточки для просмотра +
// нажатие кнопки покупки товара
// нажатие кнопки удаления товара из корзины
// нажатие кнопки открытия корзины
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
