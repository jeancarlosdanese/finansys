export class Utils {

  static convertCurrencyBrToNumber(currency: string) {
    console.log(currency);

    currency = currency.replace('.', '').replace(',', '.');
    return Number(currency);
  }

}
