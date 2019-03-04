import { Category } from '../../categories/shared/category.model';
import { BaseModel } from 'src/app/shared/models/base.model';

export class Entry extends BaseModel {

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
  ) {
    super();
  }

  static types = {
    DESPESA: 'Despesa',
    RECEITA: 'Receita'
  };

  get paidText(): string {
    return this.paid ? 'Pago' : 'Pendente';
  }
}
