import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { ServerErrorMessagesComponent } from './components/server-error-messages/server-error-messages.component';

@NgModule({
  declarations: [
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    // shared modules
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,

    // shared components
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent
  ]
})
export class SharedModule { }
