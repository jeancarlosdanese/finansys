import { Validators } from '@angular/forms';
import { Component, Injector } from '@angular/core';

import { Provider } from '../shared/provider.model';
import { BaseResourceFormComponent } from '../../../shared/components/base-resource-from/base-resource-form.component';
import { ProviderService } from '../shared/provider.service';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.scss']
})
export class ProviderFormComponent extends BaseResourceFormComponent<Provider> {

  constructor(
    protected injector: Injector,
    protected providerService: ProviderService
  ) {
    super(injector, new Provider(), providerService, Provider.fromJson);
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      _id: [null],
      type: ['COMPANY', [Validators.required]],
      name: [null, [Validators.required, Validators.minLength(2)]],
      document: [null]
    });
  }

  get typeOptions(): Array<any> {
    return Object.entries(Provider.types)
      .map(([value, text]) => {
        return {
          text,
          value
        };
      });
  }

  // protected methods
  protected creationPageTitle(): string {
    return 'Cadastro de Novo Fornecedor';
  }

  protected editionPageTitle(): string {
    const providerName = this.resource.name || '';
    return `Editando Fornecedor: ${providerName}`;
  }

}
