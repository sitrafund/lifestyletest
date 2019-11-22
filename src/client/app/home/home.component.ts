import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { MetaService } from '../services/meta.service';
import { ResultService } from '../services/result.service';

const AVERAGES_KEY = makeStateKey('averages');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MetaService],
})
export class HomeComponent implements OnInit {
  public chartData: Array<any> = [];
  public averages: any;
  public inIframe: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private resultService: ResultService,
    private state: TransferState,
    private metaService: MetaService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.averages = this.state.get(AVERAGES_KEY, null as any);

    if (!this.averages) {
      this.resultService.getAverages().subscribe(res => {
        this.averages = res;
        this.state.set(AVERAGES_KEY, res as any);
        this.formatChartData();
      });
    } else {
      this.formatChartData();
    }

    if (isPlatformBrowser(this.platformId)) {
      if (window.self !== window.top) {
        this.inIframe = true;
      } else {
        this.inIframe = false;
      }
    }

    this.metaService.constructMetaTags();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.metaService.constructMetaTags();
    });
  }

  formatChartData() {
    const _chartData = [];
    this.averages.categories.map(category => {
      _chartData.push({
        name: category.name,
        value: category.average,
        icon: category.icon,
        color: category.color,
        index: category.index,
      });
    });
    this.chartData = _chartData.sort((a, b) => {
      if (a.index < b.index) {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
