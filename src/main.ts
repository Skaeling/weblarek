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

const events = new EventEmitter();
// console.log('=ПРОДУКТЫ=');
const products = new Products(events);

// подписчик на продукты 
events.onAll(({ eventName }) => console.log('Событие', eventName))
// events.on('catalog:changed', () => {
//   console.log(
//     'Событие catalog:changed! Добавлены продукты:',
//     productsModel.getItems().map((item) => `${item.title}: ${item.price}`)
//   );
// });

// // добавляем товары в каталог
// productsModel.setItems(apiProducts.items);
// console.log(`Массив товаров из модели:`, productsModel.getItems());

// // получаем товар по Id
// console.log(`Товар по Id`, productsModel.getItemById(apiProducts.items[3].id));
// console.log(`Товар по Id не найден`, productsModel.getItemById('1234'));

// // сохраняем товар для подробного отображения и получаем его
// productsModel.setSelectedItem(apiProducts.items[3]);
// console.log(`Подробное описание товара`, productsModel.getSelectedItem());

// console.log(`\n\n=КОРЗИНА=`);
// const cartModel = new Cart(events);

// // events.on('cart:changed', () => {
// //   console.log(
// //     'Событие cart:changed! Содержимое корзины изменено:',
// //     cartModel.getItems().map((item) => `${item.title}: ${item.price}`)
// //   );
// // });

// // добавление товаров
// cartModel.addProduct(apiProducts.items[3]);
// cartModel.addProduct(apiProducts.items[1]);

// // получение массива товаров, которые находятся в корзине
// console.log(`Массив товаров в корзине:`, cartModel.getItems());

// // получение количества и стоимости всех товаров в корзине
// console.log(`Количество товаров в корзине:`, cartModel.getTotalCount());
// console.log(`Стоимость товаров в корзине:`, cartModel.getTotalPrice());

// // проверка наличия товара в корзине по его id, полученного в параметр метода.
// console.log(
//   `Товар есть в корзине?`,
//   cartModel.hasItemById(apiProducts.items[3].id)
// );
// console.log(
//   `Товар есть в корзине?`,
//   cartModel.hasItemById(apiProducts.items[2].id)
// );

// // удаление товара, полученного в параметре из массива корзины
// cartModel.removeProduct(apiProducts.items[3]);
// console.log(`Был удален товар, осталось товаров:`, cartModel.getTotalCount());

// // очистка корзины
// cartModel.clear();
// console.log(`Была очищена корзина:`, cartModel.getItems());

// console.log('\n\n=ПОКУПАТЕЛЬ=');
// const buyerModel = new Buyer(events);

// events.on('buyer:changed', () => {
//   console.log(
//     'Событие buyer:changed! Данные покупателя изменены:',
//     buyerModel.getData());
// });



// // Сохраняем данные всех полей в модель
// buyerModel.setData(mockUserFull);
// console.log(`Создан покупатель с полным профилем`, buyerModel.getData());

// // Меняем одно поле в модели
// buyerModel.setData({ address: 'Spb' });
// console.log(`Произведена замена поля 'город'`, buyerModel.getData());

// //валидация данных покупателя
// console.log(`Успешная валидация`, buyerModel.validate());
// buyerModel.setData(mockUserPart);
// console.log(`Неполная валидация`, buyerModel.validate());

// //очистка данных покупателя
// buyerModel.clearData();
// console.log(`Очищены все поля`, buyerModel.getData());

const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'))

// events.on('catalog:changed', () => {
//   const cards = products.getItems().map((product) => 
//   new CardCatalog(cloneTemplate<HTMLElement>('#card-catalog')).render({
//     ...product,
//     image: `${CDN_URL}${product.image}`,
//   })
// );

// gallery.render({catalog: cards });
// })


const modal = new Modal(
  ensureElement<HTMLElement>('#modal-container')
);

events.on('catalog:changed', () => {
  const cards = products.getItems().map((product) => {
    const card = new CardCatalog(
      cloneTemplate<HTMLElement>('#card-catalog'),
      {
        onClick: () => {
          const preview = new CardPreview(
            cloneTemplate<HTMLElement>('#card-preview'),
            {
              onAdd: () => {
                console.log('Добавить в корзину:', product);
              },
            }
          );

          const previewElement = preview.render({
            ...product,
            image: `${CDN_URL}${product.image}`,
          });

          modal.render({
            content: previewElement,
          });

          modal.open();
        },
      }
    );

    return card.render({
      ...product,
      image: `${CDN_URL}${product.image}`,
    });
  });

  gallery.render({ catalog: cards });
});


console.log('\n\n=API=');

const api = new Api(API_URL);
const apiService = new ApiService(api);

// Запрос к серверу за объектом с данными каталога.
try {
  const productsApi = await apiService.getProducts();
  console.log(`Объект с сервера с данными каталога`, productsApi);
  
  // Сохранение массива в модели данных и вывод массива в консоль.
  products.setItems(productsApi.items);
  console.log(`Массив продуктов из модели Products`, products.getItems());
} catch (error) {
  console.error('Ошибка загрузки каталога', error);
}

//  тест формы контактов
const testEvents = new EventEmitter();
const cartmodal = new Modal(ensureElement<HTMLElement>('#modal-container'))

// const contacts = new ContactsForm(testEvents, cloneTemplate<HTMLFormElement>('#contacts'))
// const order = new OrderForm(testEvents, cloneTemplate<HTMLFormElement>('#order'))
const cart = new Basket(cloneTemplate<HTMLElement>('#basket'), {
              onOrder: () => {
                console.log('Оформлено:');
              },
            })

          


testEvents.onAll(({ eventName, data }) => console.log('событие корзины', eventName, data))
const cardBasket = new CardBasket(cloneTemplate<HTMLElement>('#card-basket'), {
  onRemove: () => {console.log('товар удален')}
})
const basketCardElement = cardBasket.render(apiProducts.items[0]);
cartmodal.render({
  content: cart.render({
    list: [basketCardElement],
    price: apiProducts.items[0].price ?? 0,
  }),
});

const success = new OrderSuccess(cloneTemplate<HTMLElement>('#success'), {
  onClose: () => {console.log('window closed')}
})

cartmodal.render({content: success.render({description: 1000})})
// обновление счетчика товаров в корзине хедера
// const cartNew = new Header(ensureElement<HTMLElement>('.header'));
// cartNew.render({counter: 10})


// Клон шаблона → компонент → рендер с данными → на страницу.
// const card = new ProductCard(cloneTemplate<HTMLElement>('#card-catalog'));
// const cardsecond = new ProductCard(cloneTemplate<HTMLElement>('#card-catalog'));

// const first = card.render()
// const second = cardsecond.render({ title: "99" });

// document.body.append(card.render({ title: 'Тестовый товар', price: 100, category: 'другое', image: SubtractImage }));

// card.render({ title: "99" });


// const catalogNew = new Gallery(ensureElement<HTMLElement>('.gallery'))

// catalogNew.render({catalog: [first, second]})


// const newModal = new Modal(ensureElement<HTMLElement>('#modal-container'))

// const newForm = new OrderForm(cloneTemplate<HTMLFormElement>('#order'))

// newModal.render({content: newForm.render()})
// newModal.open()


