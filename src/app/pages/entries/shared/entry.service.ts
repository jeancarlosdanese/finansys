import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError, pipe } from 'rxjs';
import { map, catchError, flatMap} from 'rxjs/operators';
import * as currencyFormatter from 'currency-formatter';

import { Entry } from './entry.model';
import { Utils } from 'src/app/common/utils';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  // private apiPath = 'api/entries';
  private apiPath = 'http://localhost:3000/entries';
  // tslint:disable-next-line:max-line-length
  private apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJpc3MiOiJtZWF0LWFwaSIsImlhdCI6MTU1MTMxMDk0OX0.l1OJD0Yv6pILpSFFDSWtuJ6w33rn1tm60C5-EIE6J_Q';
  private options: any = null;

  constructor(private http: HttpClient) {
    this.options = this.jsonOptions();
  }

  getAll(): Observable<Entry[]> {
    return this.http.get(this.apiPath)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntries)
      );
  }

  getById(id: string): Observable<Entry> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntry)
      );
  }

  create(entry: Entry): Observable<Entry> {
    entry.amount = Utils.convertCurrencyBrToNumber(entry.amount.toString());

    return this.http.post(this.apiPath, entry, this.options)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntry)
      );
  }

  update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry._id}`;

    entry.amount = Utils.convertCurrencyBrToNumber(entry.amount.toString());

    return this.http.put(url, entry, this.options)
      .pipe(
        catchError(this.handleError),
        map(() => entry)
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

  private jsonDataToEntries(jsonData: any): Entry[] {
    const entries: Entry[] = new Array<Entry>();
    const elements = jsonData.items;

    elements.forEach(element => {
      const entry: Entry = Object.assign(new Entry(), element);
      entry.amount = currencyFormatter.format(entry.amount, {locale: 'pt_BR'});

      entries.push(entry);
    });

    return entries;
  }

  private jsonDataToEntry(jsonData: any): Entry {
    const entry = Object.assign(new Entry(), jsonData);
    entry.date = new Date(entry.date);
    entry.amount = entry.amount.toString();

    return entry;
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
