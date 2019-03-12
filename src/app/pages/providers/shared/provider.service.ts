import { Injectable, Injector } from '@angular/core';

import { Provider } from './provider.model';
import { BaseResourceService } from '../../../shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends BaseResourceService<Provider> {

  constructor(protected injector: Injector) {
    super(injector, 'http://localhost:3000/providers', Provider.fromJson);
  }
}
