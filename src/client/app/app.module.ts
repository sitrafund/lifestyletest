import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ClickOutsideModule } from 'ng-click-outside';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { ChartComponent } from './chart/chart.component';
import { HomeComponent } from './home/home.component';
import { FilterPipe } from './pipes/filter.pipe';
import { RoundUpPipe } from './pipes/round-up.pipe';
import { SortByCategoryPipe } from './pipes/sort-by-category.pipe';
import { SortByIndexPipe } from './pipes/sort-by-index.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { ThousandSeparatorPipe } from './pipes/thousand-separator.pipe';
import { QuestionComponent } from './question/question.component';
import { ResultComponent } from './result/result.component';
import { CategoryService } from './services/category.service';
import { NavigationService } from './services/navigation.service';
import { ResultService } from './services/result.service';
import { TestService } from './services/test.service';
import { TestComponent } from './test/test.component';
import { TipComponent } from './tip/tip.component';
import { UniversalTranslateLoader } from './utils/universal.translate-loader';

export function translateFactory(
  platformId: any,
  httpClient: HttpClient,
): TranslateLoader {
  const browserLoader = new TranslateHttpLoader(httpClient);
  return new UniversalTranslateLoader(
    platformId,
    browserLoader,
    'dist/public/assets/i18n',
  );
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResultComponent,
    QuestionComponent,
    CategoryComponent,
    TestComponent,
    ChartComponent,
    RoundUpPipe,
    FilterPipe,
    TipComponent,
    SortPipe,
    SortByIndexPipe,
    SortByCategoryPipe,
    ThousandSeparatorPipe,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'lifestyletest' }),
    BrowserTransferStateModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ClickOutsideModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateFactory,
        deps: [PLATFORM_ID, HttpClient],
      },
    }),
  ],
  exports: [
    AppComponent,
    HomeComponent,
    ResultComponent,
    QuestionComponent,
    CategoryComponent,
    TestComponent,
  ],
  providers: [CategoryService, ResultService, TestService, NavigationService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(@Inject(PLATFORM_ID) private readonly platformId: any) {}
}
