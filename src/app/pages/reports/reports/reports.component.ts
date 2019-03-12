import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Category } from '../../categories/shared/category.model';
import { CategoryService } from './../../categories/shared/category.service';

import { Entry } from '../../entries/shared/entry.model';
import { EntryService } from './../../entries/shared/entry.service';

import toastr from 'toastr';
import currencyFormater from 'currency-formatter';
import { NumberUtil } from './../../../common/number.util';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  expenseChartData: any;
  revenueChartData: any;

  chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  categories: Category[] = [];
  entries: Entry[] = [];

  @ViewChild('month') month: ElementRef = null;
  @ViewChild('year') year: ElementRef = null;

  serverErrorMessages: string[] = undefined;

  constructor(
    private entryService: EntryService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getAll()
      .subscribe(categories => this.categories = categories);

    this.generateReports();
  }

  public generateReports() {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    this.entryService.getByMonthAndYear(month, year)
      .subscribe(this.setValues.bind(this));

    /* if (!month || !year) {
      toastr.warning('Você precisa selecionar o Mês e o Ano para gerar relatórios');
    } else {
      this.entryService.getByMonthAndYear(month, year)
        .subscribe(this.setValues.bind(this));
    } */
  }

  private setValues(entries: Entry[]) {
    this.entries = entries;

    this.calcultaeBalance();
    this.setChartData();
  }

  private calcultaeBalance() {
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach(entry => {
      const amount = NumberUtil.convertCurrencyBrToNumber(entry.amount);

      if (entry.type === 'EXPENSE') {
        expenseTotal += amount;
      } else {
        revenueTotal += amount;
      }
    });

    this.expenseTotal = currencyFormater.format(expenseTotal, { code: 'BRL' });
    this.revenueTotal = currencyFormater.format(revenueTotal, { code: 'BRL' });
    this.balance = currencyFormater.format(revenueTotal - expenseTotal, { code: 'BRL' });
  }

  private setChartData() {
    this.revenueChartData = this.getChartData('REVENUE', 'Gráfico de Receitas', '#9ccc65');
    this.expenseChartData = this.getChartData('EXPENSE', 'Gráfico de Despesas', '#e03131');
  }

  private getChartData(entryType: string, title: string, color: string) {
    const chartData = [];

    this.categories.forEach(category => {
      // filtering entries by category and type
      const filteredEntries = this.entries.filter(entry =>
        ((entry.category._id ? entry.category._id : entry.category) === category._id) && (entry.type === entryType)
      );

      // if found entries, then sum entries and add to chartData
      if (filteredEntries.length > 0) {
        const totalAmount = filteredEntries.reduce(
          (total, entry) => total + NumberUtil.convertCurrencyBrToNumber(entry.amount), 0
        );

        chartData.push({
          categoryName: category.name,
          totalAmount
        });
      }
    });

    return {
      labels: chartData.map(item => item.categoryName),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map(item => item.totalAmount)
      }]
    };
  }

}
