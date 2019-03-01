import { Category } from '../../categories/shared/category.model';

export class Entry {

  constructor(
    public _id?: string,
    public name?: string,
    public description?: string,
    public type?: string,
    public amount?: string,
    public documentDate?: Date,
    public dueDate?: Date,
    public paymentDate?: Date,
    public paid?: boolean,
    public categoryId?: string,
    public category?: Category,
    public links?: any,
    public __v?: number
  ) {}

  static types = {
    expense: 'Despesa',
    renevue: 'Receita'
  }

  get paidText(): string {
    return this.paid ? 'Pago' : 'Pendente';
  }
}
