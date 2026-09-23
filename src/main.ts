import './scss/styles.scss';
import { apiProducts, mockUserFull, mockUserPart } from "./utils/data";
import { Products } from "./components/models/Products"
import { Cart } from './components/models/Cart';
import { Buyer } from './components/models/Buyer';
import { Api } from './components/base/Api';
import { ApiService } from './components/base/ApiService';
import { API_URL } from './utils/constants'


const productsModel = new Products();
// console.log(`Массив [] из каталога:`, productsModel.getItems())
// productsModel.setItems(apiProducts.items);
// console.log(`Массив товаров из каталога:`, productsModel.getItems())
// console.log(`ItembyId`, productsModel.getItemById('c101ab44-ed99-4a54-990d-47aa2bb4e7d9'))
// console.log(`ItembyIdNofound`, productsModel.getItemById('1ab44-ed99-4a54-990d-47aa2bb4e7d9'))
// console.log(`itemcardzero`, productsModel.getItemCard())
// productsModel.setItemCard(apiProducts.items[3])
// console.log(`itemcardyes`, productsModel.getItemCard())

const cartModel = new Cart();
// console.log(`Массив [] из cart:`, cartModel.getItems())
cartModel.setItems(apiProducts.items)
console.log(cartModel.getTotalCount())
console.log(cartModel.getTotalPrice())
console.log(`ItembyId`, cartModel.getItemById('c101ab44-ed99-4a54-990d-47aa2bb4e7d9'))
console.log(`ItembyIdNofound`, cartModel.getItemById('1ab44-ed99-4a54-990d-47aa2bb4e7d9'))
// console.log(`Массив [] из cart:`, cartModel.getItems())
cartModel.setProduct(apiProducts.items[3])
console.log(cartModel.getTotalCount())
console.log(cartModel.getTotalPrice())

// console.log(`Массив [] из cart:`, cartModel.getItems())
cartModel.delProduct(apiProducts.items[3])
// console.log(`Массив [] из cart:`, cartModel.getItems())
cartModel.clear()
// console.log(`Массив [] из cart:`, cartModel.getItems())
console.log(cartModel.getTotalPrice())
cartModel.setItems(apiProducts.items)


const buyerModel = new Buyer()
buyerModel.setData(mockUserFull);
console.log(`Замена всех полей`, buyerModel.getData())
console.log(`Успешная валидация`, buyerModel.validate())
buyerModel.setData(mockUserPart);
console.log(`Поле телефон не заполнено`, buyerModel.validate())
console.log(`Замена одного поля`, buyerModel.getData())
buyerModel.clearData()
console.log(`Очищены все поля`, buyerModel.getData())
console.log(`Все поля не заполнены`, buyerModel.validate())
buyerModel.setData(mockUserFull);


const Request = new Api(API_URL)
const newRequest = new ApiService(Request)

console.log(`Массив продуктов`, await newRequest.getProducts())
const cartModelOrder = new Cart();
const cartList = await newRequest.getProducts()
cartModelOrder.setItems(cartList.items)


// Пока не нужно для ПР8
// const orderData = {
//   ...buyerModel.getData(), 
//   total: cartModelOrder.getTotalPrice(), 
//   items: cartModelOrder.getItems().map(({ id }) => id) 

// }
// console.log(`Успешное размещение заказа`, await newRequest.postOrder(orderData))

// Создание экземпляров всех созданных классов.
// Тестирование всех методов моделей данных. 
// Выполняется тестирование вызовом методов с передачей необходимых данных и проверкой результатов с помощью вывода данных в консоль. 
// Данные, выводимые в консоль, должны быть также получены с использованием методов классов.
// Запрос к серверу за объектом с данными каталога.
// Сохранение массива в модели данных и вывод массива в консоль.