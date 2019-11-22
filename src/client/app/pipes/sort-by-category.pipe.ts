import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByCategory',
})
export class SortByCategoryPipe implements PipeTransform {
  transform(tips: any, worstCategory?: any): any {
    const small = [];
    const medium = [];
    const large = [];

    for (const tip of tips) {
      if (tip.environmentEffect.en === 'small') {
        small.push(tip);
      } else if (tip.environmentEffect.en === 'medium') {
        medium.push(tip);
      } else if (tip.environmentEffect.en === 'large') {
        large.push(tip);
      }
    }

    if (worstCategory) {
      large.sort((a: any, b: any) => {
        for (const tag of worstCategory.tags.en) {
          if (a.tag.en.toUpperCase() === tag.toUpperCase()) {
            if (b.tag.en.toUpperCase() === tag.toUpperCase()) {
              return 0;
            }
            if (b.tag.en.toUpperCase() !== tag.toUpperCase()) {
              return -1;
            }
            return 1;
          } else {
            return 1;
          }
        }
      });
    }

    let _tips = [];
    _tips = _tips.concat(large);
    _tips = _tips.concat(medium);
    _tips = _tips.concat(small);

    return _tips;
  }
}
