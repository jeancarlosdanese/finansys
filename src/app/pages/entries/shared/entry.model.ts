import { Category } from '../../categories/shared/category.model';
import { Moment } from 'moment';

export class Entry {

  constructor(
    public _id?: string,
    public name?: string,
    public description?: string,
    public type?: string,
    public amount?: number,
    // public amountFormat?: string,
    public date?: Date,
    public paid?: boolean,
    // public categoryId?: string,
    public category?: Category,
    public _links?: any,
    public __v?: number
  ) { }

  static types = {
    DESPESA: 'Despesa',
    RECEITA: 'Receita'
  };

  get paidText(): string {
    return this.paid ? 'Pago' : 'Pendente';
  }
}
