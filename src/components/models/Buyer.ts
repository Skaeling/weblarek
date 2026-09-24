import { TPayment, IBuyer, TValidationErrors } from '../../types';
import { buyerMap } from '../../utils/constants';

export class Buyer {
  private _payment: TPayment = null;
  private _address: string = '';
  private _email: string = '';
  private _phone: string = '';

  // сохраняет данные в модель,
  // с возможностью изменить только одно значение объекта, не удаляя других.
  setData(data: Partial<IBuyer>): void {
    if (data.payment !== undefined) {
      this._payment = data.payment;
    }
    if (data.address !== undefined) {
      this._address = data.address;
    }
    if (data.email !== undefined) {
      this._email = data.email;
    }
    if (data.phone !== undefined) {
      this._phone = data.phone;
    }
  }

  // получает все данные покупателя
  getData(): IBuyer {
    return {
      payment: this._payment,
      address: this._address,
      email: this._email,
      phone: this._phone,
    };
  }

  // очищает все данные покупателя
  clearData(): void {
    this._payment = null;
    this._address = '';
    this._email = '';
    this._phone = '';
  }

  //валидирует все поля формы, возвращает объект с ошибками или пустой.
  validate(): TValidationErrors {
    const data = this.getData();
    const errors: TValidationErrors = {};

    Object.entries(data).forEach(([key, value]) => {
      const typedKey = key as keyof IBuyer;
      if (value === '' || value === null) {
        errors[typedKey] =
          `Поле ${buyerMap[typedKey]} обязательно для заполнения`;
      }
    });

    return errors;
  }
}
