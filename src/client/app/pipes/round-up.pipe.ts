import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundUp',
})
export class RoundUpPipe implements PipeTransform {
  transform(value: number): number {
    return Math.ceil(value / 100) * 100;
  }
}
