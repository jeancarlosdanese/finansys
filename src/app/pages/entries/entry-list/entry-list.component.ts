import { Component, OnInit, Injector, HostListener } from '@angular/core';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { BaseResourceListComponent } from '../../../shared/components/base-resource-list/base-resource-list.component';

import * as currencyFormatter from 'currency-formatter';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent extends BaseResourceListComponent<Entry> implements OnInit {

  entries: Entry[] = [];
  entrySelected: Entry;

  constructor(
    protected injector: Injector,
    protected entryService: EntryService
  ) {
    super(injector, entryService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadPage(`/entries?page=${this.page}&limit=${this.limit}&start=${this.start}`);
    this.resources = this.resources.sort((a, b) => b.amount - a.amount);
  }

}
