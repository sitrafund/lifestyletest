import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CategoryService } from '../services/category.service';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  animations: [
    trigger('slide', [
      state(
        'enter',
        style({
          transform: 'translateX(100%)',
          opacity: 0,
        }),
      ),
      state(
        'in',
        style({
          transform: 'none',
          opacity: 1,
        }),
      ),
      state(
        'leave',
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
        }),
      ),
      transition('enter => in', animate('250ms ease-out')),
      transition('in => leave', animate('250ms ease-in')),
      transition('leave => in', animate('250ms ease-out')),
      transition('in => enter', animate('250ms ease-in')),
    ]),
  ],
})
export class QuestionComponent implements OnInit {
  public question: any = {};
  public category: any;
  public questionCount: number = 0;
  public animationState: string = 'enter';
  public answerClicked: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    public testService: TestService,
    public categoryService: CategoryService,
    public translate: TranslateService,
  ) {}

  ngOnInit() {
    this.testService.currentQuestion.subscribe((value: any) => {
      if (this.question && value && this.question.index > value.index) {
        this.animationState = 'enter';
        setTimeout(() => {
          this.animationState = 'leave';
          setTimeout(() => {
            this.question = value;
            this.animationState = 'in';
          }, 125);
        }, 500);
      } else if (this.question && this.question._id === undefined) {
        // if question is first one in category, show question right away
        this.question = value;
        setTimeout(() => {
          this.answerClicked = false;
          this.animationState = 'in';
        }, 0);
      } else {
        setTimeout(() => {
          this.animationState = 'enter';
          this.question = value;
          setTimeout(() => {
            this.answerClicked = false;
            this.animationState = 'in';
          }, 125);
        }, 500);
      }
      if (isPlatformBrowser(this.platformId)) {
        const focusEl = document.getElementById('focus');
        if (focusEl) {
          focusEl.focus();
        }
      }
    });

    this.testService.currentCategory.subscribe((value: any) => {
      this.category = value;
    });

    this.categoryService.getAllCategories().subscribe((categories: any) => {
      categories.map(category => {
        this.questionCount += category.questions.length;
      }, this);
    });
  }

  saveAnswer(answer) {
    this.answerClicked = true;
    this.testService.saveAnswer(answer);
    setTimeout(() => {
      this.animationState = 'leave';
    }, 0);
  }
}
