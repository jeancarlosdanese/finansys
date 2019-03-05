import { Component, OnInit } from '@angular/core';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent extends BaseResourceListComponent<Entry> implements OnInit {

  entries: Entry[] = [];
  entrySelected: Entry;

  constructor(
    private entryService: EntryService
  ) {
    super(entryService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.resources = this.resources.sort((a, b) => b.amount - a.amount);
  }

}
