import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];
  categorySelected: Category;

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getAll()
      .subscribe(categories => this.categories = categories,
                 error => alert('Erro ao carrregar a lista'));
  }

  deleteCategory() {
    // const mustDelete = confirm('Deseja realmente excluir este item?');
    // console.log(this.categorySelected);

    // if (mustDelete) {
    this.categoryService.delete(this.categorySelected._id)
      .subscribe(
        () => this.categories = this.categories.filter(element => element !== this.categorySelected),
        () => alert('Erro ao tentar excluir!')
      );
    // }
  }

  setCategorySelected(category) {
    this.categorySelected = category;
  }

}
