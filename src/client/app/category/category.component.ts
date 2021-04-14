import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Category } from '../interfaces/category';
import { Question } from '../interfaces/question';
import { Result } from '../interfaces/result';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [
    trigger('fade', [
      state(
        'in',
        style({
          opacity: 1,
        }),
      ),
      state(
        'out',
        style({
          opacity: 0,
        }),
      ),
      transition('out => in', animate('250ms ease-out')),
      transition('in => leave', animate('250ms ease-in')),
    ]),
    trigger('fadeOut', [
      state(
        'in',
        style({
          opacity: 0,
        }),
      ),
      state(
        'out',
        style({
          opacity: 1,
        }),
      ),
      transition('out => in', animate('250ms ease-out')),
      transition('in => leave', animate('250ms ease-in')),
    ]),
  ],
})
export class CategoryComponent implements OnInit {
  public category: Category;
  public question: Question;
  public result: Result;
  public showPositive: Boolean = false;
  public showNegative: Boolean = false;
  public animationState: string = 'out';

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    public testService: TestService,
    public translate: TranslateService,
  ) {}

  ngOnInit() {
    this.testService.currentCategory.subscribe((value: Category) => {
      this.category = value;
    });
    this.testService.currentQuestion.subscribe((value: Question) => {
      if (value === undefined) {
        this.chooseEndInfo();
        setTimeout(() => {
          this.animationState = 'in';
        }, 250);
        setTimeout(() => {
          this.focusTitle();
        }, 600);
      } else {
        this.animationState = 'out';
        this.showPositive = false;
        this.showNegative = false;
      }
      this.question = value;
    });
    this.testService.result.subscribe((value: Result) => {
      this.result = value;
    });
  }

  chooseEndInfo() {
    if (this.result) {
      this.result.categoryCO2e.map(category => {
        if (category.category._id === this.category._id) {
          if (category.co2e < this.category.averageCo2e) {
            this.showPositive = true;
          } else {
            this.showNegative = true;
          }
        }
      }, this);
    }
  }

  focusTitle() {
    if (isPlatformBrowser(this.platformId)) {
      const focusEl = document.getElementById('category-title');
      if (focusEl) {
        focusEl.focus();
      }
    }
  }

  saveCategory() {
    this.testService.saveCategory();
    this.animationState = 'out';
  }
}
