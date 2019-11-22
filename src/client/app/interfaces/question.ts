export class Question {
  public _id: string;
  public title: { en: string; fi: string; se: string };
  public index: number;
  public answers: Array<any>;

  constructor(question) {
    this._id = question._id;
    this.title = question.title;
    this.index = question.index;
    this.answers = question.answers;
  }
}
