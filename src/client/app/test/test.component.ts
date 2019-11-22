import { Component, HostListener, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Category } from '../interfaces/category';
import { Question } from '../interfaces/question';
import { Result } from '../interfaces/result';
import { CategoryService } from '../services/category.service';
import { MetaService } from '../services/meta.service';
import { ResultService } from '../services/result.service';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  providers: [MetaService, TestService],
})
export class TestComponent implements OnInit {
  public categories: Array<Category> = undefined;
  public currentCategory: Category = undefined;
  public currentQuestion: Question = undefined;
  public result: Result;
  public questionCount: number = 0;
  public totalCo2e: number = 0;
  public chartData = [];

  updateChart() {
    const chartData = [];
    this.result.categoryCO2e.map((categoryCO2e, index) => {
      chartData.push({
        name: categoryCO2e.category.title,
        value: Math.ceil(categoryCO2e.co2e / 100) * 100,
        color: categoryCO2e.category.color,
      });
    }, this);
    this.chartData = chartData;
  }

  constructor(
    public metaService: MetaService,
    public testService: TestService,
    public categoryService: CategoryService,
    public resultService: ResultService,
    public translate: TranslateService,
  ) {}

  ngOnInit() {
    this.metaService.constructMetaTags();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.metaService.constructMetaTags();
    });
    this.testService.currentCategory.subscribe((value: Category) => {
      this.currentCategory = value;
    });
    this.testService.currentQuestion.subscribe((value: Question) => {
      this.currentQuestion = value;
    });
    this.testService.result.subscribe((value: Result) => {
      this.result = value;
      if (
        this.result &&
        this.result.categoryCO2e &&
        this.result.categoryCO2e.length > 0
      ) {
        this.updateChart();
      }
    });
    this.categoryService.getAllCategories().subscribe((categories: any) => {
      this.categories = categories;
      this.calculateQuestionCount();
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    $event.returnValue =
      'Olet poistumassa testistä, joka poistaa tuloksesi. Oletko varma?';
  }

  calculateQuestionCount() {
    this.categories.map(category => {
      this.questionCount += category.questions.length;
    });
  }

  goToPreviousQuestion() {
    this.testService.goToPreviousQuestion();
  }
}
