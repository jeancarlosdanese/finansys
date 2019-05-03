import { BaseResourceModel } from '../../../shared/models/base-resource.model';
import { Category } from '../../categories/shared/category.model';
import { Provider } from '../../providers/shared/provider.model';

export class Entry extends BaseResourceModel {

  constructor(
    // public _id?: string,
    public description?: string,
    public document?: string,
    public type?: string,
    public amount?: any,
    // public amountFormat?: string,
    public date?: Date,
    public paid?: boolean,
    // public categoryId?: string,
    public category?: Category,
    public provider?: Provider,
    // public _links?: any,
    // public __v?: number
  ) {
    super();
  }

  static types = {
    EXPENSE: 'Despesa',
    REVENUE: 'Receita'
  };

  static fromJson(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }

  get paidText(): string {
    return this.paid ? 'Pago' : 'Pendente';
  }
}
