import { Component, Injector, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import { BaseResourceListComponent } from '../../../shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent extends BaseResourceListComponent<Category> implements OnInit {

  categories: Category[] = [];

  constructor(
    protected injector: Injector,
    protected categoryService: CategoryService
  ) {
    super(injector, categoryService);
  }

  ngOnInit() {
    this.loadPage(`/categories?page=${this.page}&limit=${this.limit}&start=${this.start}`);
  }

}
