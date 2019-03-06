export class NumberUtil {

  static convertCurrencyBrToNumber(currency: string): any {
    currency = currency.replace('R$', '').trim().replace(/\./g, '').replace(',', '.');
    return Number(currency);
  }

}
