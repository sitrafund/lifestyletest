import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() values;
  @Input() minScale;
  public maxValue: number = 0;
  public currentHover: String;
  public iterations: Array<number>;
  public currentLang: string;

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.currentLang = this.translate.currentLang;
    this.maxValue = 0;
    this.values.map(value => {
      this.maxValue += value.value;
    }, this);
    this.values.map(value => {
      value.width = this.minScale
        ? Math.floor((value.value / this.minScale) * 100) + '%'
        : Math.floor((value.value / this.maxValue) * 100) + '%';
    }, this);
  }

  ngOnChanges() {
    this.iterations = Array(this.values.length).fill(null);
    if (this.minScale > 0) {
      this.maxValue = this.minScale;
    } else {
      let currentMax = 0;
      this.values.map(value => {
        currentMax += value.value;
      }, this);
      this.maxValue = 7800 > currentMax ? 7800 : currentMax;
    }
    this.values.map(value => {
      value.width = Math.floor((value.value / this.maxValue) * 100) + '%';
    }, this);
  }

  toggleTooltip(name?) {
    if (this.currentHover === name) {
      this.currentHover = undefined;
    } else {
      this.currentHover = name;
    }
  }
}
