import { Injectable } from '@angular/core';

export class Month {
  value: number;
  name: string;
}


@Injectable({
  providedIn: 'root'
})
export class DomainsService {

  constructor() { }

  get months() {
    const months: Month[] = [
      { value: 1, name: 'Janeiro' },
      { value: 2, name: 'Fevereiro' },
      { value: 3, name: 'Março' },
      { value: 4, name: 'Abril' },
      { value: 5, name: 'Maio' },
      { value: 6, name: 'Junho' },
      { value: 7, name: 'Julho' },
      { value: 8, name: 'Agosto' },
      { value: 9, name: 'Setembro' },
      { value: 10, name: 'Outubro' },
      { value: 11, name: 'Novembro' },
      { value: 12, name: 'Dezembro' },
    ];

    return months;
  }

  get years() {
    const years: number[] = [
      2015,
      2016,
      2017,
      2018,
      2019
    ];

    return years;
  }

}
