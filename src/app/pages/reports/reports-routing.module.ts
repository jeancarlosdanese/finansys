import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';
import { ReportsExpenseComponent } from './reports-expense/reports-expense.component';

const routes: Routes = [
  { path: '', component: ReportsComponent },
  { path: 'expense', component: ReportsExpenseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
