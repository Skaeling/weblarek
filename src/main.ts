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
import { IBuyer, IProduct } from './types';

const events = new EventEmitter();

// создаем модели 
const products = new Products(events);
const cart = new Cart(events)
const buyer = new Buyer(events)

// создаем статичные компоненты 
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'))
const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'))
const header = new Header(ensureElement<HTMLElement>('.header'), {
  onCartClick: () => events.emit('basket:selected')})
const order = new OrderForm(events, cloneTemplate<HTMLFormElement>('#order'))
const contacts = new ContactsForm(events, cloneTemplate<HTMLFormElement>('#contacts'))



events.onAll(({ eventName }) => console.log('Событие', eventName))

// функция рендера детальной карточки
function renderCardPreview(item: IProduct) {
  const isInCart = cart.hasItemById(item.id)
  modal.render({
    content: new CardPreview(cloneTemplate<HTMLElement>('#card-preview'), {
      onAction: events.trigger('productCard:changed', item)
    }).render({
      title: item.title,
      text: item.description,
      price: item.price,
      category: item.category,
      image: CDN_URL + item.image,
      buttonText: isInCart ? 'Удалить из корзины' : 'В корзину',
      valid: item.price !== null
      
    })})
}

// функция рендера корзины с товарами
function renderBasket() {
  const orderCards = cart.getItems().map((item, index) =>
  new CardBasket(cloneTemplate<HTMLElement>('#card-basket'), {onRemove: events.trigger('basket:removeRequested', item),}).render(
    {...item,
    index: index + 1}
  ))
  modal.render({content: new Basket(cloneTemplate<HTMLElement>('#basket'), {
    onOrder: events.trigger('basket:orderRequested'),

  }).render({list: orderCards, price: cart.getTotalPrice(), valid: cart.getTotalCount() > 0})
})
}

// Каталог изменился → забрать товары у модели и перерисовать карточки.
events.on('catalog:changed', () => {
  const cards = products.getItems().map((item) =>
    new CardCatalog(cloneTemplate<HTMLElement>('#card-catalog'), {
      onClick: events.trigger('productCard:selected', item),
    }).render({
      title: item.title,
      price: item.price,
      category: item.category,
      image: CDN_URL + item.image
    })
  );

  gallery.render({ catalog: cards });
});

// выбрана корзина в хедере -> отрисовываем modal Basket
events.on('basket:selected', () => {
  renderBasket();
})


// выбрана конкретная карточка -> обновляем модель products
events.on('productCard:selected', (item: IProduct) => {
  products.setSelectedItem(item)
  renderCardPreview(item);
});

// Запрошено изменение конкретной карточка -> забираем из products её id -> обновляем модель Cart -> закрываем модальное окно
events.on('productCard:changed', () => {
  const item = products.getSelectedItem()
  if (!item) {
    return;
  }
  if (cart.hasItemById(item.id)) {
    cart.removeProduct(item)}
  else {
    cart.addProduct(item);
  }
  modal.close()
});

//Запрошено удаление товара из корзины -> обновляем модель Cart -> рендерим корзину
events.on('basket:removeRequested', (item: IProduct) => {
  cart.removeProduct(item);
  renderBasket()

})


// модель Cart изменена  -> обновляем counter хедера
events.on('cart:changed', () => {
  header.render({counter: cart.getTotalCount()})
  });


// запрошено оформление заказа ->  открывается модальное окно с формой оформления товара.
events.on('basket:orderRequested', (item: IBuyer) => {
  buyer.setData(item)
  modal.render({content: order.render()}) 
})

// форма изменена -> обновление Buyer
events.on(
  'orderForm:changed',
  (data: { field: keyof IBuyer; value: string }) => {
    buyer.setData({
      [data.field]: data.value,
    });
  }
);

// обновление Buyer -> валидация Buyer -> рендер формы
events.on('buyer:changed', () => {
  const buyerData = buyer.getData();
  const errors = buyer.validate();

  const orderErrors = {
    payment: errors.payment,
    address: errors.address,
  };
  const actualErrors = Object.values(orderErrors).filter(Boolean);
  const touched = buyerData.payment !== null || buyerData.address !== '';
  order.render(
    {
      payment: buyerData.payment,
      address: buyerData.address,
      errors: touched ? orderErrors : {},
      valid: actualErrors.length === 0,

    }
  )
})

//форма принята -> открытие формы контактов
events.on('orderForm:submitted', () => {
modal.render({content: contacts.render()})
})

//вынести в общую функцию с order changed
events.on('contacts:changed', () => {
  (data: { field: keyof IBuyer; value: string }) => {
    buyer.setData({
      [data.field]: data.value,
    });
  }

})


events.on('buyer:changed', () => {
  const buyerData = buyer.getData();
  const errors = buyer.validate();

  const contactsErrors = {
    email: errors.email,
    phone: errors.phone,
  };
  const actualErrors = Object.values(contactsErrors).filter(Boolean);
  const touched = buyerData.phone !== '' || buyerData.email !== '';
  order.render(
    {
      payment: buyerData.payment,
      address: buyerData.address,
      errors: touched ? contactsErrors : {},
      valid: actualErrors.length === 0,

    }
  )
})

// В Моделях данных:
// изменение каталога товаров +
// изменение выбранного для просмотра товара +
// изменение содержимого корзины +
// изменение данных покупателя +

// В Представлениях:
// выбор карточки для просмотра +
// нажатие кнопки покупки товара + 
// нажатие кнопки удаления товара из корзины +
// нажатие кнопки открытия корзины +
// нажатие кнопки оформления заказа +
// нажатие кнопки перехода ко второй форме оформления заказа +
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
