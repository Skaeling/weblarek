import './scss/styles.scss';
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
import { IOrderRequest, IProduct, TBuyerChange } from './types';

const events = new EventEmitter();
const api = new Api(API_URL);
const apiService = new ApiService(api);

// создаем модели
const products = new Products(events);
const cart = new Cart(events);
const buyer = new Buyer(events);

// создаем статичные компоненты
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'));
const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'));
const header = new Header(ensureElement<HTMLElement>('.header'), {
  onCartClick: events.trigger('basket:selected'),
});
const cardPreview = new CardPreview(
  cloneTemplate<HTMLElement>('#card-preview'),
  { onAction: events.trigger('productCard:changed') }
);
const basket = new Basket(cloneTemplate<HTMLElement>('#basket'), {
  onOrder: events.trigger('basket:orderRequested'),
});
const order = new OrderForm(events, cloneTemplate<HTMLFormElement>('#order'));
const contacts = new ContactsForm(
  events,
  cloneTemplate<HTMLFormElement>('#contacts')
);
const success = new OrderSuccess(cloneTemplate<HTMLElement>('#success'), {
  onClose: events.trigger('success:closed'),
});

let orderTouched = false;
let contactsTouched = false;

events.onAll(({ eventName }) => console.log('Событие', eventName));

// функция рендера корзины с товарами
function renderBasket() {
  const orderCards = cart.getItems().map((item, index) =>
    new CardBasket(cloneTemplate<HTMLElement>('#card-basket'), {
      onRemove: events.trigger('basket:removeRequested', item),
    }).render({ ...item, index: index + 1 })
  );
  modal.render({
    content: basket.render({
      list: orderCards,
      price: cart.getTotalPrice(),
      valid: cart.getTotalCount() > 0,
    }),
  });
}

//колбек для обновления Buyer в событиях форм
const updateBuyer = (data: TBuyerChange) => {
  buyer.setData({
    [data.field]: data.value,
  });
};

// Каталог изменился → забрать товары у модели и перерисовать карточки.
events.on('catalog:changed', () => {
  const cards = products.getItems().map((item) =>
    new CardCatalog(cloneTemplate<HTMLElement>('#card-catalog'), {
      onClick: events.trigger('productCard:selected', item),
    }).render({
      title: item.title,
      price: item.price,
      category: item.category,
      image: item.image,
    })
  );

  gallery.render({ catalog: cards });
});

// выбрана корзина в хедере -> отрисовываем modal Basket
events.on('basket:selected', () => {
  renderBasket();
});

// выбрана конкретная карточка -> сохраняем продукт в модель Products
events.on('productCard:selected', (item: IProduct) => {
  products.setSelectedItem(item);
});

// в каталоге была сохранен продукт -> рендер детальной карточки
events.on('catalog:cardSelected', () => {
  const currentProduct = products.getSelectedItem();
  if (!currentProduct) {
    return;
  }
  const isInCart = cart.hasItemById(currentProduct.id);
  modal.render({
    content: cardPreview.render({
      title: currentProduct.title,
      text: currentProduct.description,
      price: currentProduct.price,
      category: currentProduct.category,
      image: currentProduct.image,
      buttonText: isInCart ? 'Удалить из корзины' : 'В корзину',
      valid: currentProduct.price !== null,
    }),
  });
});

// Запрошено изменение конкретной карточка -> забираем из products её id -> обновляем модель Cart -> закрываем модальное окно
events.on('productCard:changed', () => {
  const item = products.getSelectedItem();
  if (!item) {
    return;
  }
  if (cart.hasItemById(item.id)) {
    cart.removeProduct(item);
  } else {
    cart.addProduct(item);
  }
  modal.close();
});

//Запрошено удаление товара из корзины -> обновляем модель Cart
events.on('basket:removeRequested', (item: IProduct) => {
  cart.removeProduct(item);
});

// модель Cart изменена  -> обновляем counter хедера и корзину
events.on('cart:changed', () => {
  renderBasket();
  header.render({ counter: cart.getTotalCount() });
});

// запрошено оформление заказа ->  рендер формы Order
events.on('basket:orderRequested', () => {
  const buyerData = buyer.getData();
  modal.render({
    content: order.render({
      payment: buyerData.payment,
      address: buyerData.address,
    }),
  });
});

// форма Order изменена -> обновление Buyer
events.on('orderForm:changed', (data: TBuyerChange) => {
  orderTouched = true;
  updateBuyer(data);
});

//форма заказа принята -> рендер формы Contacts
events.on('orderForm:submitted', () => {
  const data = buyer.getData();
  modal.render({
    content: contacts.render({
      email: data.email,
      phone: data.phone,
    }),
  });
});

//форма Contacts изменена -> обновляем Buyer
events.on('contacts:changed', (data: TBuyerChange) => {
  contactsTouched = true;
  updateBuyer(data);
});

// обновление Buyer -> валидация Buyer -> рендер обеих форм
events.on('buyer:changed', () => {
  const buyerData = buyer.getData();
  const errors = buyer.validate();

  const orderErrors = {
    payment: errors.payment,
    address: errors.address,
  };

  const contactsErrors = {
    email: errors.email,
    phone: errors.phone,
  };

  order.render({
    address: buyerData.address,
    payment: buyerData.payment,
    errors: orderTouched ? orderErrors : {},
    valid: !Object.values(orderErrors).some(Boolean),
  });

  contacts.render({
    email: buyerData.email,
    phone: buyerData.phone,
    errors: contactsTouched ? contactsErrors : {},
    valid: !Object.values(errors).some(Boolean),
  });
});

//при нажатии на кнопку оплаты -> передача данных о заказе на сервер,
events.on('contacts:submitted', async () => {
  const buyerData = buyer.getData();

  const request: IOrderRequest = {
    email: buyerData.email,
    phone: buyerData.phone,
    address: buyerData.address,
    payment: buyerData.payment!,
    total: cart.getTotalPrice(),
    items: cart.getItems().map((item) => item.id),
  };

  try {
    const response = await apiService.postOrder(request);
    // появляется сообщение об успешной оплате, товары удаляются из корзины, данные покупателя очищаются.
    orderTouched = false;
    contactsTouched = false;
    cart.clear();
    buyer.clearData();
    modal.render({ content: success.render({ total: response.total }) });
  } catch (error) {
    console.error('Ошибка размещения заказа', error);
  }
});

// закрытие Succes по клику на кнопку
events.on('success:closed', () => {
  modal.close();
});

// Запрос к серверу за объектом с данными каталога.
try {
  const productsApi = await apiService.getProducts();

  // Сохранение массива в модель Products c обновленным путем image.
  const updImageProducts = productsApi.items.map((item) => ({
    ...item,
    image: CDN_URL + item.image,
  }));
  products.setItems(updImageProducts);
} catch (error) {
  console.error('Ошибка загрузки каталога', error);
}
