import { TPayment } from "../../types"
import { IBuyer } from "../../types"
import { TValidationErrors } from "../../types"


export class Buyer {
private _payment: TPayment = null
private _address: string = ""
private _email: string = ""
private _phone: string = ""

// сохраняет данные в модель, с возможностью 
// изменить только одно значение объекта, не удаляя других.
setData(data: Partial<IBuyer>): void {
if (data.payment !== undefined) {
  this._payment = data.payment;
}
if (data.address !== undefined) {
  this._address = data.address
}
if (data.email !== undefined) {
  this._email = data.email
}
if (data.phone !== undefined) {
  this._phone = data.phone
}

}

// получает все данные покупателя
getData(): IBuyer {
  return {
    payment: this._payment,
    address: this._address,
    email: this._email,
    phone: this._phone,
  }
}

// очищает все данные покупателя
clearData(): void {
  this._payment = null
  this._address = ''
  this._email = ''
  this._phone = ''
}

validate() {
  const data = this.getData()
  const errors: TValidationErrors = {}

  Object.entries(data).forEach(([key, value]) => {
    if (value === '' || value === null) {
      errors[key as keyof IBuyer] = "Поле обязательно";
    }
  });

  return errors
    }
  
   
}






// {
// payment: 'Не выбран вид оплаты',
// email: 'Укажите емэйл',
// }

// выбор способа оплаты (способ оплаты может принимать значения “card” или “cash”);
// ввод адреса доставки;
// если адрес доставки не введён, появляется сообщение об ошибке;
// если способ оплаты не выбран, появляется сообщение об ошибке;
// кнопка «Далее» может быть активной, если на форме нет ошибок, 
// выбран способ оплаты и поле «адрес доставки» непустое;
// при нажатии «Далее» открывается вторая форма оформления покупки.
// Второй шаг:
// ввод почты и телефона покупателя;
// если одно из полей не заполнено, появляется сообщение об ошибке;
// кнопка «Оплатить» может быть активной, только если на форме нет ошибок, т.е. поля почты и телефона непустые;
// при нажатии на кнопку оплаты происходит следующее: на сервер выполняется передача данных о заказе, появляется сообщение об успешной оплате, товары удаляются из корзины, данные покупателя очищаются.