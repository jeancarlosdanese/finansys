import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];
  entrySelected: Entry;

  constructor(
    private router: Router,
    private entryService: EntryService
  ) { }

  ngOnInit() {
    this.entryService.getAll()
      .subscribe(entries => this.entries = entries.sort((a, b) => b.amount - a.amount),
      error => alert('Erro ao carrregar a lista'));
  }

  deleteEntry() {
    // const mustDelete = confirm('Deseja realmente excluir este item?');
    // console.log(this.entrySelected);

    // if (mustDelete) {
    this.entryService.delete(this.entrySelected._id)
      .subscribe(
        () => this.entries = this.entries.filter(element => element !== this.entrySelected),
        () => alert('Erro ao tentar excluir!')
      );
    // }
  }

  setEntrySelected(entry) {
    this.entrySelected = entry;
  }

}
