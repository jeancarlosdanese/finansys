import { Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

import { BaseResourceModel } from '../models/base-resource.model';

export abstract class BaseResourceService<T extends BaseResourceModel> {

  // tslint:disable-next-line:max-line-length
  private apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJpc3MiOiJtZWF0LWFwaSIsImlhdCI6MTU1MTMxMDk0OX0.l1OJD0Yv6pILpSFFDSWtuJ6w33rn1tm60C5-EIE6J_Q';
  private options: any = null;

  protected http: HttpClient;

  constructor(
    protected injector: Injector,
    protected apiPath: string,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
    this.http = injector.get(HttpClient);
    this.options = this.jsonOptions();
  }

  getAll(): Observable<T[]> {
    return this.http.get(this.apiPath)
      .pipe(
        map(this.jsonDataToResources.bind(this)),
        catchError(this.handleError)
      );
  }

  getById(id: string): Observable<T> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url)
      .pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError)
      );
  }

  create(resource: T): Observable<T> {

    return this.http.post(this.apiPath, resource, this.options)
      .pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError)
      );
  }

  update(resource: T): Observable<T> {
    const url = `${this.apiPath}/${resource._id}`;

    return this.http.put(url, resource, this.options)
      .pipe(
        map(() => resource),
        catchError(this.handleError)
      );
  }

  delete(id: string): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url, this.options)
      .pipe(
        map(() => null),
        catchError(this.handleError)
      );
  }

  // protected methods
  protected jsonDataToResources(jsonData: any): T[] {
    const categories: T[] = [];
    const elements = jsonData.items;

    elements.forEach(element => categories.push(this.jsonDataToResourceFn(element)));

    return categories;
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handleError(error: any): Observable<any> {
    console.log('Erro na requisição: ', error);

    return throwError(error);
  }

  // private methods
  private jsonOptions() {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + this.apiToken);

    return { headers: httpHeaders };
  }

}
