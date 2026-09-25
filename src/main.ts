import './scss/styles.scss';
import { apiProducts, mockUserFull, mockUserPart } from './utils/data';
import { Products } from './components/models/Products';
import { Cart } from './components/models/Cart';
import { Buyer } from './components/models/Buyer';
import { Api } from './components/base/Api';
import { ApiService } from './components/services/ApiService';
import { API_URL } from './utils/constants';

console.log('=ПРОДУКТЫ=');
const productsModel = new Products();
// добавляем товары в каталог
productsModel.setItems(apiProducts.items);
console.log(`Массив товаров из модели:`, productsModel.getItems());

// получаем товар по Id
console.log(`Товар по Id`, productsModel.getItemById(apiProducts.items[3].id));
console.log(`Товар по Id не найден`, productsModel.getItemById('1234'));

// сохраняем товар для подробного отображения и получаем его
productsModel.setSelectedItem(apiProducts.items[3]);
console.log(`Подробное описание товара`, productsModel.getSelectedItem());

console.log(`\n\n=КОРЗИНА=`);
const cartModel = new Cart();
// добавление товаров
cartModel.addProduct(apiProducts.items[3]);
cartModel.addProduct(apiProducts.items[1]);

// получение массива товаров, которые находятся в корзине
console.log(`Массив товаров в корзине:`, cartModel.getItems());

// получение количества и стоимости всех товаров в корзине
console.log(`Количество товаров в корзине:`, cartModel.getTotalCount());
console.log(`Стоимость товаров в корзине:`, cartModel.getTotalPrice());

// проверка наличия товара в корзине по его id, полученного в параметр метода.
console.log(
  `Товар есть в корзине?`,
  cartModel.hasItemById(apiProducts.items[3].id)
);
console.log(
  `Товар есть в корзине?`,
  cartModel.hasItemById(apiProducts.items[2].id)
);

// удаление товара, полученного в параметре из массива корзины
cartModel.removeProduct(apiProducts.items[3]);
console.log(`Был удален товар, осталось товаров:`, cartModel.getTotalCount());

// очистка корзины
cartModel.clear();
console.log(`Была очищена корзина:`, cartModel.getItems());

console.log('\n\n=ПОКУПАТЕЛЬ=');
const buyerModel = new Buyer();
// Сохраняем данные всех полей в модель
buyerModel.setData(mockUserFull);
console.log(`Создан покупатель с полным профилем`, buyerModel.getData());

// Меняем одно поле в модели
buyerModel.setData({ address: 'Spb' });
console.log(`Произведена замена поля 'город'`, buyerModel.getData());

//валидация данных покупателя
console.log(`Успешная валидация`, buyerModel.validate());
buyerModel.setData(mockUserPart);
console.log(`Неполная валидация`, buyerModel.validate());

//очистка данных покупателя
buyerModel.clearData();
console.log(`Очищены все поля`, buyerModel.getData());

console.log('\n\n=API=');

const api = new Api(API_URL);
const apiService = new ApiService(api);

// Запрос к серверу за объектом с данными каталога.
try {
  const productsApi = await apiService.getProducts();
  console.log(`Объект с сервера с данными каталога`, productsApi);
  
  // Сохранение массива в модели данных и вывод массива в консоль.
  productsModel.setItems(productsApi.items);
  console.log(`Массив продуктов из модели Products`, productsModel.getItems());
} catch (error) {
  console.error('Ошибка загрузки каталога', error);
}
