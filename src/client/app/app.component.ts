import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  Component,
  Inject,
  Injector,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public inIframe = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private injector: Injector,
    private titleService: Title,
    public translate: TranslateService,
  ) {
    this.translate.setDefaultLang('fi');

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTitle();
    });

    // Detect if language is English and change translate.currentLang to affect the whole site
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        const pathArgument = event.url.split('/')[1];
        if (pathArgument === 'en') {
          this.translate.use('en');
        } else if (pathArgument === 'se') {
          this.translate.use('se');
        }
      }
      if (event instanceof NavigationEnd) {
        if (this.router.routerState.root.firstChild) {
          this.router.routerState.root.firstChild.data.subscribe(data => {
            if (data.language) {
              this.translate.use(data.language);
            }
          });
        }
      }
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (window.self !== window.top) {
        this.inIframe = true;
      } else {
        this.inIframe = false;
      }
    }
  }

  setTitle() {
    this.translate.get('SHARE.HOME.TITLE').subscribe(translation => {
      this.titleService.setTitle(translation);
    });
  }
}
