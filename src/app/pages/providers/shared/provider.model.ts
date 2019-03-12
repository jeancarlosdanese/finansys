import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Provider extends BaseResourceModel {

  constructor(
    public _id?: string,
    public name?: string,
    public document?: string,
    public links?: any,
    public __v?: number
  ) {
    super();
  }

  static types = {
    PERSON: 'Pessoa',
    COMPANY: 'Empresa'
  };

  static fromJson(jsonData: any): Provider {
   return Object.assign(new Provider(), jsonData);
  }
}
