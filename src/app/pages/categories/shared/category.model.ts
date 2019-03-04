import { BaseModel } from 'src/app/shared/models/base.model';

export class Category extends BaseModel {

  constructor(
    public _id?: string,
    public name?: string,
    public description?: string,
    public links?: any,
    public __v?: number
  ) {
    super();
  }

}
