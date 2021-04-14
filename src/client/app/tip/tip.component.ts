import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Category } from '../interfaces/category';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss'],
})
export class TipComponent implements OnInit, OnChanges {
  @Input() tips: Array<any>;
  @Input() worstCategory: Category;

  public tags: Array<any> = [];
  public environmentEffects: Array<any> = [];
  public tagFilter: string = undefined;
  public environmentEffectFilter: string = undefined;
  public filteringStatus: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    public translate: TranslateService,
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.cookie.split('; ').map(cookie => {
        const _cookie = cookie.split('=');
        if (_cookie[0] === 'tagFilter') {
          this.filterByTag(_cookie[1]);
        } else if (_cookie[0] === 'environmentEffectFilter') {
          this.filterByEnvironmentEffect(_cookie[1]);
        }
      });
    }
  }

  ngOnChanges() {
    this.tips.map(tip => {
      if (this.tags.findIndex(_tag => _tag.fi === tip.tag.fi) === -1) {
        this.tags.push(tip.tag);
      }
      if (
        this.environmentEffects.findIndex(
          _environmentEffects =>
            _environmentEffects.fi === tip.environmentEffect.fi,
        ) === -1
      ) {
        this.environmentEffects.push(tip.environmentEffect);
      }
    });
  }

  filterByTag(tag?) {
    if (isPlatformBrowser(this.platformId)) {
      if (!tag || this.tagFilter === tag) {
        this.tagFilter = undefined;
        document.cookie = 'tagFilter=;';
      } else {
        this.tagFilter = tag;
        document.cookie = 'tagFilter=' + this.tagFilter;
      }

      this.updateFilterStatus();
    }
  }

  filterByEnvironmentEffect(environmentEffect?) {
    if (isPlatformBrowser(this.platformId)) {
      if (
        !environmentEffect ||
        this.environmentEffectFilter === environmentEffect
      ) {
        this.environmentEffectFilter = undefined;
        document.cookie = 'environmentEffectFilter=;';
      } else {
        this.environmentEffectFilter = environmentEffect;
        document.cookie =
          'environmentEffectFilter=' + this.environmentEffectFilter;
      }

      this.updateFilterStatus();
    }
  }

  updateFilterStatus() {
    this.filteringStatus = '';
    setTimeout(() => {
      this.filteringStatus = 'done';
    }, 300);
  }
}
