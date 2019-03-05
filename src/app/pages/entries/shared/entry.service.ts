import { Injectable, Injector } from '@angular/core';
import * as currencyFormatter from 'currency-formatter';

import { Entry } from './entry.model';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

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
    const elements = jsonData.items;

    elements.forEach(element => {
      const entry: Entry = Entry.fromJson(element);
      entry.date = new Date(entry.date);
      entry.amount = currencyFormatter.format(entry.amount, {locale: 'pt_BR'});

      entries.push(entry);
    });

    return entries.sort((a, b) => b.date.valueOf() - a.date.valueOf());
  }

  protected jsonDataToResource(jsonData: any): Entry {
    const entry: Entry = Entry.fromJson(jsonData);
    entry.date = new Date(entry.date);
    // entry.amount = entry.amount;

    return entry;
  }

}
