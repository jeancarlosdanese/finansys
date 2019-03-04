import { Category } from '../../categories/shared/category.model';
import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class Entry extends BaseResourceModel {

  constructor(
    public _id?: string,
    public name?: string,
    public description?: string,
    public type?: string,
    public amount?: any,
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

  static fromJson(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }

  get paidText(): string {
    return this.paid ? 'Pago' : 'Pendente';
  }
}
