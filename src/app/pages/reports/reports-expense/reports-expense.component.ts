import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import currencyFormater from 'currency-formatter';

import { NumberUtil } from './../../../common/number.util';
import { EntryService } from './../../entries/shared/entry.service';
import { Entry } from './../../entries/shared/entry.model';
import { DomainsService, Month } from 'src/app/shared/services/domins.service';

@Component({
  selector: 'app-reports-expense',
  templateUrl: './reports-expense.component.html',
  styleUrls: ['./reports-expense.component.scss']
})
export class ReportsExpenseComponent implements OnInit {

  filterForm: FormGroup;

  paidTotal: any = 0;
  noPaidTotal: any = 0;
  balance: any = 0;
  years: number[];
  months: Month[];

  entries: Entry[] = [];

  // @ViewChild('month') month: ElementRef = null;
  // @ViewChild('year') year: ElementRef = null;
  // @ViewChild('paid') paid: ElementRef = null;

  constructor(
    private formBuilder: FormBuilder,
    private entryService: EntryService,
    private domainService: DomainsService
  ) { }

  ngOnInit() {
    this.buildResourceForm();
    this.months = this.domainService.months;
    this.years = this.domainService.years;
    this.generateReports();
  }

  public generateReports() {
    const month = this.filterForm.value.month;
    const year = this.filterForm.value.year;
    const paid = this.filterForm.value.paid;

    this.entryService.getByMonthAndYear(paid, month, year)
      .subscribe(this.setValues.bind(this));
  }

  private setValues(entries: Entry[]) {
    this.entries = entries;

    this.calculateBalance();
  }

  private calculateBalance() {
    let paidTotal = 0;
    let noPaidTotal = 0;

    this.entries.forEach(entry => {
      const amount = NumberUtil.convertCurrencyBrToNumber(entry.amount);

      if (entry.paid) {
        paidTotal += amount;
      } else {
        noPaidTotal += amount;
      }
    });

    this.paidTotal = currencyFormater.format(paidTotal, { code: 'BRL' });
    this.noPaidTotal = currencyFormater.format(noPaidTotal, { code: 'BRL' });
    this.balance = currencyFormater.format(paidTotal + noPaidTotal, { code: 'BRL' });
  }

  private buildResourceForm(): void {
    this.filterForm = this.formBuilder.group({
      paid: [null],
      month: [null],
      year: [null]
    });
  }

}
