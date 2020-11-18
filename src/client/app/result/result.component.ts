import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Category } from '../interfaces/category';
import { Result } from '../interfaces/result';
import { ResultService } from '../services/result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  public result: Result;
  public id: string;
  public isBrowser = isPlatformBrowser(this.platformId);

  // Charts
  public minScale: number = 0;
  public resultChart: Array<any> = [];
  public averageChart: Array<any> = [];
  public averageTotal: number = 0;

  // Tips
  public tips: Array<any> = [];

  // Social media share urls
  public facebookUrl: string = '';
  public twitterUrl: string = '';
  public linkedinUrl: string = '';
  public mailtoUrl: string = '';

  // Result classification
  public bestCategory: Category;
  public worstCategory: Category;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    public resultService: ResultService,
    public route: ActivatedRoute,
    public router: Router,
    public translate: TranslateService,
    public metaService: Meta,
  ) {
    this.getId();
  }

  getId() {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      if (isPlatformBrowser(this.platformId)) {
        const appToken = document.cookie.split('; ').find(cookie => {
          const _cookie = cookie.split('=');
          if (_cookie[0] === 'appToken') {
            return true;
          }
        });
        if (appToken) {
          const _cookie = appToken.split('=');
          if (_cookie[1] !== this.id) {
            window.location.href = '/';
          } else {
            this.getResult();
          }
        } else {
          window.location.href = '/';
        }
      } else {
        this.getResult();
      }
    });
  }

  getResult() {
    this.resultService.getResult(this.id).subscribe(
      result => {
        this.result = result;
        this.chooseClassification();
        this.formatResultChart();
      },
      error => console.error(error),
    );
  }

  constructMetaTags() {
    if (this.result) {
      const co2e = Math.ceil(this.result.co2e / 100) * 100;
      const resultCategory = this.bestCategory.slug[this.translate.currentLang];
      const altTitle = this.bestCategory.resultInfo.altTitle[
        this.translate.currentLang
      ];

      // Open Graph

      this.translate
        .get('SHARE.FB.TITLE', { value: co2e })
        .subscribe(translation => {
          this.metaService.updateTag({
            property: 'og:title',
            content: translation,
          });
        });
      this.translate.get('SHARE.FB.DESCRIPTION').subscribe(translation => {
        this.metaService.updateTag({
          property: 'og:description',
          content: translation,
        });
      });

      // Twitter

      this.metaService.updateTag({
        property: 'twitter:card',
        content: 'summary',
      });
      this.metaService.updateTag({
        property: 'twitter:title',
        content: altTitle,
      });
      this.translate
        .get('SHARE.TWITTER.DESCRIPTION', { value: co2e })
        .subscribe(translation => {
          this.metaService.updateTag({
            property: 'twitter:description',
            content: translation,
          });
        });

      // Common

      this.translate.get('URL').subscribe(translation => {
        this.metaService.updateTag({
          property: 'og:image',
          content:
            translation + 'assets/images/share-' + resultCategory + '.png',
        });
        this.metaService.updateTag({
          property: 'twitter:image',
          content:
            translation +
            'assets/images/twitter-share-' +
            resultCategory +
            '.png',
        });
      });
    }
  }

  chooseClassification() {
    this.resultService
      .chooseClassification(this.result)
      .subscribe(classification => {
        this.bestCategory = classification.bestCategory;
        this.worstCategory = classification.worstCategory;
        this.parseTips();
        this.constructMetaTags();
        this.parseShareUrls();

        setTimeout(() => {
          this.focusTitle();
        }, 0);
      });
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.constructMetaTags();
    });
    this.resultService.getAverages().subscribe((averages: any) => {
      if (averages) {
        this.averageTotal = averages.average;
        this.formatAverageChart(averages);
      }
    });
  }

  formatAverageChart(averages) {
    const _averageChart = [];
    averages.categories.map(category => {
      this.averageChart.push({
        name: category.name,
        value: Math.ceil(category.average / 100) * 100,
        icon: category.icon,
        color: category.color,
        index: category.index,
      });
    });
    this.averageChart.sort((a, b) => {
      if (a.index < b.index) {
        return -1;
      } else {
        return 1;
      }
    });
    this.updateCurrentMax();
  }

  formatResultChart() {
    const averageChart = [];
    this.result.categoryCO2e.map((categoryCO2e, index) => {
      if (categoryCO2e.category) {
        averageChart.push({
          name: categoryCO2e.category.title,
          value: Math.ceil(categoryCO2e.co2e / 100) * 100,
          icon: categoryCO2e.category.icon,
          color: categoryCO2e.category.color,
        });
      }
    }, this);
    this.resultChart = averageChart;
    this.updateCurrentMax();
  }

  updateCurrentMax() {
    let resultMax = 0;
    let averageMax = 0;
    if (this.result) {
      this.result.categoryCO2e.map(categoryCO2e => {
        resultMax += Math.ceil(categoryCO2e.co2e / 100) * 100;
      }, this);
    }
    if (this.averageChart) {
      this.averageChart.map(data => {
        averageMax += Math.ceil(data.value / 100) * 100;
      });
    }
    if (resultMax > this.minScale || averageMax > this.minScale) {
      this.minScale = resultMax < averageMax ? averageMax : resultMax;
    }
  }

  parseShareUrls() {
    let shareUrl = '';
    if (isPlatformBrowser(this.platformId)) {
      shareUrl = encodeURIComponent(window.location.href);
    }

    // Facebook URL
    this.facebookUrl = 'http://www.facebook.com/share.php?u=' + shareUrl;

    // Twitter URL
    this.twitterUrl =
      'https://twitter.com/intent/tweet?text=' +
      this.bestCategory.resultInfo.altTitle[this.translate.currentLang] +
      '&url=' +
      shareUrl;

    // LinkedIn URL
    this.linkedinUrl =
      'http://www.linkedin.com/shareArticle?mini=true&url=' + shareUrl;

    // Mailto URL
    this.translate
      .get('MY_CARBON_FOOTPRINT', {
        co2e: Math.ceil(this.result.co2e / 100) * 100,
      })
      .subscribe(text => {
        this.mailtoUrl =
          'mailto:?body=' +
          encodeURIComponent(text) +
          '&subject=' +
          encodeURIComponent(
            this.bestCategory.resultInfo.altTitle[this.translate.currentLang],
          );
      });
  }

  parseTips() {
    this.result.answers.map(answer => {
      if (answer.answer && answer.answer.tips) {
        answer.answer.tips.map((tip, index) => {
          if (this.tips.findIndex(_tip => _tip._id === tip._id) === -1) {
            this.tips.push(tip);
          }
        });
      }
    }, this);
  }

  focusTitle() {
    if (isPlatformBrowser(this.platformId)) {
      const focusEl = document.getElementById('result-title');
      if (focusEl) {
        focusEl.focus();
      }
    }
  }

  goToHomePage() {
    if (isPlatformBrowser(this.platformId)) {
      window.scroll(0, 0);
    }
    this.router.navigate(['/']);
  }
}
