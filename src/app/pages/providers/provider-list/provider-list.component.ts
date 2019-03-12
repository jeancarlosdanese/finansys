import { Component } from '@angular/core';

import { BaseResourceListComponent } from '../../../shared/components/base-resource-list/base-resource-list.component';

import { Provider } from '@angular/compiler/src/compiler_facade_interface';
import { ProviderService } from '../shared/provider.service';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss']
})
export class ProviderListComponent extends BaseResourceListComponent<Provider> {

  providers: Provider[] = [];

  constructor(
    private providerService: ProviderService
  ) {
    super(providerService);
  }

}
