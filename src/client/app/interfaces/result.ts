import { Category } from './category';

export class Result {
  public _id: string;
  public co2e: number;
  public categoryCO2e: [{ category: Category; co2e: number }];
  public answers: Array<any>;

  constructor(result: any) {
    this._id = result._id;
    this.co2e = result.co2e;
    this.categoryCO2e = result.categoryCO2e;
    this.answers = result.answers;
  }
}
