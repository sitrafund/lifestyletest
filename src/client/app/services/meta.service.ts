import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MetaService {
  constructor(private meta: Meta, private translate: TranslateService) {}

  constructMetaTags() {
    this.translate.get('SHARE.HOME.TITLE').subscribe(translation => {
      this.meta.updateTag({
        property: 'og:title',
        content: translation,
      });
      this.meta.updateTag({
        property: 'twitter:title',
        content: translation,
      });
    });

    this.translate.get('SHARE.HOME.DESCRIPTION').subscribe(translation => {
      this.meta.updateTag({
        property: 'description',
        content: translation,
      });
      this.meta.updateTag({
        property: 'og:description',
        content: translation,
      });
      this.meta.updateTag({
        property: 'twitter:description',
        content: translation,
      });
    });

    this.meta.updateTag({
      property: 'twitter:card',
      content: 'summary',
    });

    this.translate.get('URL').subscribe(translation => {
      this.meta.updateTag({
        property: 'og:image',
        content: translation + 'assets/images/share-facebook.png',
      });
      this.meta.updateTag({
        property: 'twitter:image',
        content: translation + 'assets/images/twitter-share-twitter.png',
      });
    });
  }
}
