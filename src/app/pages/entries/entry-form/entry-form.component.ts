import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { switchMap } from 'rxjs/operators';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

import { Category } from './../../categories/shared/category.model';
import { CategoryService } from './../../categories/shared/category.service';

import { NumberUtil } from 'src/app/common/number.util';
import { BaseResourceFormComponent } from '../../../shared/components/base-resource-from/base-resource-form.component';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit  {

  categories: Array<Category>;

  imaskAmountConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '.',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
    monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
    today: 'Hoje',
    clear: 'Limpar',
    dateFormat: 'dd/mm/yy'
  };

  constructor(
    protected injector: Injector,
    protected entryService: EntryService,
    protected categoryService: CategoryService
  ) {
    super(injector, new Entry(), entryService, Entry.fromJson);
  }

  ngOnInit() {
    this.loadCategories();
    super.ngOnInit();
  }

  get typeOptions(): Array<any> {
    return Object.entries(Entry.types)
      .map(([value, text]) => {
        return {
          text,
          value
        };
      });
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      _id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ['DESPESA', [Validators.required]],
      amount: [null, [Validators.required]],
      date: [new Date(), [Validators.required]],
      paid: [true, [Validators.required]],
      category: [null, [Validators.required]]
    });
  }

  protected loadResource() {
    if (this.currentAction === 'edit') {
      this.route.paramMap
        .pipe(switchMap(params => this.entryService.getById(params.get('id')))
      )
      .subscribe(entry => {
        entry.amount = entry.amount.toString();
        this.resourceForm.patchValue(entry);
        this.setPageTitle();
      },
      error => alert('Ocorreu um erro no servidor, tente mais tarde'));
    }
  }

  protected createResource() {
    const entry: Entry = this.formValueToEntry();

    this.entryService.create(entry)
      .subscribe(
        entry => this.actionsForSuccess(entry),
        error => this.actionsForError(error)
      );
  }

  protected updateResource() {
    const entry: Entry = this.formValueToEntry();

    this.entryService.update(entry)
      .subscribe(
        entry => this.actionsForSuccess(entry),
        error => this.actionsForError(error)
      );
  }

  private loadCategories() {
    this.categoryService.getAll()
      .subscribe(categories => this.categories = categories);
  }

  private formValueToEntry(): Entry {
    const entry: Entry = Object.assign(new Entry(), this.resourceForm.value);
    entry.amount = NumberUtil.convertCurrencyBrToNumber(entry.amount.toString());

    return entry;
  }

  protected creationPageTitle(): string {
    return 'Cadastro de Novo Lançamento';
  }

  protected editionPageTitle(): string {
    const resourceName = this.resource.name || '';
    return `Editando Lançamento ${resourceName ? ': ' + resourceName : ''}`;
  }

}
