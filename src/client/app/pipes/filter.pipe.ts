import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  constructor(public translate: TranslateService) {}

  transform(values: any, args?: any): any {
    if (!args) {
      return values;
    }
    if (values) {
      return values.filter(item => {
        if (item.tag[this.translate.currentLang] === args) {
          return true;
        }
        if (item.environmentEffect[this.translate.currentLang] === args) {
          return true;
        }
      });
    }
  }
}
