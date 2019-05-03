import { Component, Injector, OnInit } from '@angular/core';

import { BaseResourceListComponent } from '../../../shared/components/base-resource-list/base-resource-list.component';

import { Provider } from '@angular/compiler/src/compiler_facade_interface';
import { ProviderService } from '../shared/provider.service';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss']
})
export class ProviderListComponent extends BaseResourceListComponent<Provider> implements OnInit {

  providers: Provider[] = [];

  constructor(
    protected injector: Injector,
    protected providerService: ProviderService
  ) {
    super(injector, providerService);
  }

  ngOnInit() {
    this.loadPage(`/providers?page=${this.page}&limit=${this.limit}&start=${this.start}`);
  }

}
