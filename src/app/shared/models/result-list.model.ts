export class ResultList {
  _links?: any;
  results?: any[];
  size?: number;
  limit?: number;
  start?: number;

  static fromJson(jsonData: any): any {
    return Object.assign(new ResultList(), jsonData);
  }
}
