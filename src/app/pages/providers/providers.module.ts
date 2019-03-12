import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { ProviderFormComponent } from './provider-form/provider-form.component';

@NgModule({
  declarations: [
    ProviderListComponent,
    ProviderFormComponent
  ],
  imports: [
    SharedModule,
    ProvidersRoutingModule
  ]
})
export class ProvidersModule { }
