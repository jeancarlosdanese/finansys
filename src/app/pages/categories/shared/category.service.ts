import { Injectable, Injector } from '@angular/core';

import { Category } from './category.model';
import { BaseResourceService } from '../../../shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category> {

  constructor(protected injector: Injector) {
    super(injector, 'http://localhost:3000/categories', Category.fromJson);
  }
}
