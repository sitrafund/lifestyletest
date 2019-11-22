import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value.sort((x, y) => {
      if (
        x.environmentEffect.en === 'small' &&
        y.environmentEffect.en === 'medium'
      ) {
        return 1;
      }
      if (
        x.environmentEffect.en === 'small' &&
        y.environmentEffect.en === 'large'
      ) {
        return -1;
      }
      if (
        x.environmentEffect.en === 'medium' &&
        y.environmentEffect.en === 'small'
      ) {
        return -1;
      }
      if (
        x.environmentEffect.en === 'medium' &&
        y.environmentEffect.en === 'large'
      ) {
        return 1;
      }
      if (
        x.environmentEffect.en === 'large' &&
        y.environmentEffect.en === 'small'
      ) {
        return -1;
      }
      if (
        x.environmentEffect.en === 'large' &&
        y.environmentEffect.en === 'medium'
      ) {
        return -1;
      }
      return 0;
    });
  }
}
