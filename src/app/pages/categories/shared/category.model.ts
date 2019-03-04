import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Category extends BaseResourceModel {

  constructor(
    public _id?: string,
    public name?: string,
    public description?: string,
    public links?: any,
    public __v?: number
  ) {
    super();
  }

  static fromJson(jsonData: any): Category {
   return Object.assign(new Category(), jsonData);
  }
}
