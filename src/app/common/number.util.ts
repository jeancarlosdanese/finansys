export class NumberUtil {

  static convertCurrencyBrToNumber(currency: string) {
    currency = currency.replace(/\./g, '').replace(',', '.');
    return Number(currency);
  }

}
