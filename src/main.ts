import './scss/styles.scss';
import { apiProducts } from "./utils/data";
import { Products } from "./components/models/Products"
import { Cart } from './components/models/Cart';
import { Buyer } from './components/models/Buyer';
import { EPaymentMethod } from './types'


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
// cartModel.setItems(apiProducts.items)
// console.log(cartModel.getTotalCount())
// console.log(cartModel.getTotalPrice())
// console.log(`ItembyId`, cartModel.getItemById('c101ab44-ed99-4a54-990d-47aa2bb4e7d9'))
// console.log(`ItembyIdNofound`, cartModel.getItemById('1ab44-ed99-4a54-990d-47aa2bb4e7d9'))
// console.log(`Массив [] из cart:`, cartModel.getItems())
// cartModel.setProduct(apiProducts.items[3])
// console.log(cartModel.getTotalCount())
// console.log(cartModel.getTotalPrice())

// console.log(`Массив [] из cart:`, cartModel.getItems())
// cartModel.delProduct(apiProducts.items[3])
// console.log(`Массив [] из cart:`, cartModel.getItems())
// cartModel.clear()
// console.log(`Массив [] из cart:`, cartModel.getItems())
// console.log(cartModel.getTotalPrice())

const buyerModel = new Buyer()
const mockUserFull = {
  payment: EPaymentMethod.Card,
  email: "example@com",
  phone: "+123456789",
  address: 'Moscow city'
}

const mockUserPart = {
  phone: ""
}

buyerModel.setData(mockUserFull);
console.log(`Замена всех полей`, buyerModel.getData())
console.log(`Успешная валидация`, buyerModel.validate())
buyerModel.setData(mockUserPart);
console.log(`Поле телефон не заполнено`, buyerModel.validate())
console.log(`Замена одного поля`, buyerModel.getData())
buyerModel.clearData()
console.log(`Очищены все поля`, buyerModel.getData())
console.log(`Все поля не заполнены`, buyerModel.validate())





