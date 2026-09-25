import { TPayment, IBuyer, TValidationErrors } from '../../types';
import { buyerMap } from '../../utils/constants';

export class Buyer {
  private payment: TPayment | null = null;
  private address: string = '';
  private email: string = '';
  private phone: string = '';

  // сохраняет данные в модель,
  // с возможностью изменить только одно значение объекта, не удаляя других.
  setData(data: Partial<IBuyer>): void {
    if (data.payment !== undefined) {
      this.payment = data.payment;
    }
    if (data.address !== undefined) {
      this.address = data.address;
    }
    if (data.email !== undefined) {
      this.email = data.email;
    }
    if (data.phone !== undefined) {
      this.phone = data.phone;
    }
  }

  // получает все данные покупателя
  getData(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      email: this.email,
      phone: this.phone,
    };
  }

  // очищает все данные покупателя
  clearData(): void {
    this.payment = null;
    this.address = '';
    this.email = '';
    this.phone = '';
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
