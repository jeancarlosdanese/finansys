import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError, pipe } from 'rxjs';
import { map, catchError, flatMap} from 'rxjs/operators';
import { Category } from './category.model';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // private apiPath = 'api/categories';
  private apiPath = 'http://localhost:3000/categories';
  // tslint:disable-next-line:max-line-length
  private apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJpc3MiOiJtZWF0LWFwaSIsImlhdCI6MTU1MTMxMDk0OX0.l1OJD0Yv6pILpSFFDSWtuJ6w33rn1tm60C5-EIE6J_Q';
  private options: any = null;

  constructor(private http: HttpClient) {
    this.options = this.jsonOptions();
  }

  getAll(): Observable<Category[]> {
    return this.http.get(this.apiPath)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToCategories)
      );
  }

  getById(id: string): Observable<Category> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToCategory)
      );
  }

  create(category: Category): Observable<Category> {

    return this.http.post(this.apiPath, category, this.options)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToCategory)
      );
  }

  update(category: Category): Observable<Category> {
    const url = `${this.apiPath}/${category._id}`;

    return this.http.put(url, category, this.options)
      .pipe(
        catchError(this.handleError),
        map(() => category)
      );
  }

  delete(id: string): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url, this.options)
      .pipe(
        catchError(this.handleError),
        map(() => null)
      );
  }

  private jsonDataToCategories(jsonData: any): Category[] {
    const categories: Category[] = [];
    const elements = jsonData.items;

    elements.forEach(element => categories.push(Object.assign(new Category(), element)));

    return categories;
  }

  private jsonDataToCategory(jsonData: any): Category {
    return Object.assign(new Category(), jsonData);
  }

  private handleError(error: any): Observable<any> {
    console.log('Erro na requisição: ', error);

    return throwError(error);
  }

  private jsonOptions() {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + this.apiToken);

    return { headers: httpHeaders };
  }

}
