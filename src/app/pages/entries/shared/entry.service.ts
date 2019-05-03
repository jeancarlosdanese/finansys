import { Injectable, Injector } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as currencyFormatter from 'currency-formatter';

import { Entry } from './entry.model';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

import { Observable } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { ResultList } from 'src/app/shared/models/result-list.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(protected injector: Injector) {
    super(injector, 'http://localhost:3000/entries', Entry.fromJson);
  }

  // pretected methods
  protected jsonDataToResources(jsonData: any): Entry[] {
    const entries: Entry[] = new Array<Entry>();
    const elements = jsonData.results;

    elements.forEach(element => {
      const entry: Entry = Entry.fromJson(element);
      entry.date = new Date(entry.date);
      entry.amount = currencyFormatter.format(entry.amount, {code: 'BRL'});

      entries.push(entry);
    });

    return entries.sort((a, b) => b.date.valueOf() - a.date.valueOf());
  }

  // pretected methods
  protected jsonDataToResultList(jsonData: any): ResultList {
    const entries: Entry[] = new Array<Entry>();
    const elements = jsonData.results;

    elements.forEach(element => {
      const entry: Entry = Entry.fromJson(element);
      entry.date = new Date(entry.date);
      entry.amount = currencyFormatter.format(entry.amount, {code: 'BRL'});

      entries.push(entry);
    });

    const result = new ResultList();
    result._links = jsonData._links;
    result.limit = jsonData.limit;
    result.size = jsonData.size;
    result.start = jsonData.start;

    result.results = entries.sort((a, b) => b.date.valueOf() - a.date.valueOf());

    console.log(result);

    return result;
  }

  protected jsonDataToResource(jsonData: any): Entry {
    const entry: Entry = Entry.fromJson(jsonData);
    entry.date = new Date(entry.date);
    // entry.amount = entry.amount;

    return entry;
  }

  public getByMonthAndYear(paid: boolean, month: number, year: number): Observable<Entry[]> {

    const params = new HttpParams({fromString: 'paid=' + paid + '&month=' + month + '&year=' + year});

    return this.http.get(this.apiPath, { params })
      .pipe(
        map(this.jsonDataToResources.bind(this)),
        catchError(this.handleError)
      );
  }

}
