import { NgModule } from '@angular/core';

import { ChartModule } from 'primeng/chart';

import { SharedModule } from '../../shared/shared.module';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports/reports.component';
import { ReportsExpenseComponent } from './reports-expense/reports-expense.component';

@NgModule({
  declarations: [
    ReportsComponent,
    ReportsExpenseComponent,
  ],
  imports: [
    SharedModule,
    ChartModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
