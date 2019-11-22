export class Category {
  public _id: string;
  public index: number;
  public title: { en: string; fi: string; se: string };
  public endInfoPositive: { en: string; fi: string; se: string };
  public endInfoNegative: { en: string; fi: string; se: string };
  public endInfoCommon: { en: string; fi: string; se: string };
  public averageCo2e: number;
  public color: string;
  public icon: string;
  public questions: Array<any>;
  public slug: { en: string; fi: string; se: string };
  public resultInfo: {
    image: string;
    title: { en: string; fi: string; se: string };
    altTitle: { en: string; fi: string; se: string };
    positiveDescription: { en: string; fi: string; se: string };
    negativeDescription: { en: string; fi: string; se: string };
  };

  constructor(category) {
    this._id = category._id;
    this.index = category.index;
    this.title = category.title;
    this.endInfoPositive = category.endInfoPositive;
    this.endInfoNegative = category.endInfoNegative;
    this.endInfoCommon = category.endInfoCommon;
    this.averageCo2e = category.averageCo2e;
    this.color = category.color;
    this.icon = category.icon;
    this.questions = category.questions;
    this.slug = category.slug;
    this.resultInfo = category.resultInfo;
  }
}
