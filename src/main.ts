import './scss/styles.scss';
import { apiProducts } from "./utils/data";
import { Products } from "./components/models/Products"

const productsModel = new Products();
console.log(`Массив [] из каталога:`, productsModel.getItems())
productsModel.setItems(apiProducts.items);
// console.log(`Массив товаров из каталога:`, productsModel.getItems())
// console.log(`ItembyId`, productsModel.getItemById('c101ab44-ed99-4a54-990d-47aa2bb4e7d9'))
// console.log(`ItembyIdNofound`, productsModel.getItemById('1ab44-ed99-4a54-990d-47aa2bb4e7d9'))
// console.log(`itemcardzero`, productsModel.getItemCard())
// productsModel.setItemCard(apiProducts.items[3])
// console.log(`itemcardyes`, productsModel.getItemCard())

