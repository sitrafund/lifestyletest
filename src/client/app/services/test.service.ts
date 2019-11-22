import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../interfaces/category';
import { Question } from '../interfaces/question';
import { Result } from '../interfaces/result';
import { CategoryService } from '../services/category.service';
import { ResultService } from '../services/result.service';

@Injectable()
export class TestService {
  public categories: Array<Category>;

  public result: BehaviorSubject<Result> = new BehaviorSubject(null);
  public currentCategory: BehaviorSubject<Category> = new BehaviorSubject(null);
  public currentQuestion: BehaviorSubject<Question> = new BehaviorSubject(null);

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    public categoryService: CategoryService,
    public resultService: ResultService,
    public router: Router,
    public translate: TranslateService,
  ) {
    // Get categories and save them
    // Get route params and select right category
    this.categoryService.getAllCategories().subscribe(
      categories => {
        this.setCategories(categories);
        if (this.getResult()) {
          this.setResultCategories();
        }
        this.setCurrentCategory(this.getCategories()[0].title);
      },
      error => {
        console.error(error);
      },
    );

    // Some sort of cookie implementation should be made for refreshes
    this.resultService.createResult().subscribe(
      result => {
        this.setResult(new Result(result));
        if (this.getCategories()) {
          this.setResultCategories();
        }
      },
      error => {
        console.error(error);
      },
    );
  }

  /*--------------------------------------------------------------------------
        RESULTS
    --------------------------------------------------------------------------*/

  setResult = result => {
    this.result.next(result);
  };

  getResult() {
    return this.result.value;
  }

  saveResult() {
    this.resultService
      .updateResult(this.getResult())
      .subscribe(status => status, error => error);
  }

  goToResultPage() {
    this.getResult().categoryCO2e.map(category => {
      this.getResult().co2e += category.co2e;
    });
    if (isPlatformBrowser(this.platformId)) {
      document.cookie = 'appToken=' + this.getResult()._id;
    }

    this.resultService
      .saveResult(this.getResult())
      .subscribe(status => status, error => error);
    this.translate.get('RESULT_URL').subscribe(translation => {
      this.router.navigate([translation, this.getResult()._id]);
    });
  }

  /*--------------------------------------------------------------------------
        CATEGORIES
    --------------------------------------------------------------------------*/

  setResultCategories() {
    const tmpResult = this.getResult();
    this.getCategories().map(category => {
      tmpResult.categoryCO2e.push({
        category: category,
        co2e: 0,
      });
    });
    this.setResult(tmpResult);
  }

  setCategories = categories => {
    this.categories = categories;
  };

  getCategories() {
    return this.categories;
  }

  setCurrentCategory = categoryTitle => {
    this.categories.map(category => {
      if (category.title === categoryTitle) {
        this.currentCategory.next(category);
        this.setCurrentQuestion(category.questions[0]);
      }
    });
  };

  getCurrentCategory() {
    return this.currentCategory.value;
  }

  saveCategory() {
    const indexOfCurrentCategory = this.categories.indexOf(
      this.getCurrentCategory(),
    );
    const numberOfCategories = this.categories.length;

    if (indexOfCurrentCategory + 1 < numberOfCategories) {
      this.goToNextCategory(indexOfCurrentCategory, numberOfCategories);
    } else {
      this.goToResultPage();
    }
  }

  goToNextCategory = (indexOfCurrentCategory, numberOfCategories) => {
    this.setCurrentCategory(this.categories[indexOfCurrentCategory + 1].title);
  };

  goToPreviousCategory() {
    this.setCurrentCategory(
      this.categories[this.categories.indexOf(this.getCurrentCategory()) - 1]
        .title,
    );
    this.setCurrentQuestion(undefined);
  }

  /*--------------------------------------------------------------------------
        QUESTIONS
    --------------------------------------------------------------------------*/

  setCurrentQuestion = question => {
    this.currentQuestion.next(question);
    // this.currentQuestion.next(undefined)
  };

  getCurrentQuestion() {
    return this.currentQuestion.value;
  }

  goToNextQuestion() {
    const indexOfCurrentQuestion = this.getCurrentCategory().questions.indexOf(
      this.getCurrentQuestion(),
    );
    const numberOfQuestions = this.getCurrentCategory().questions.length;

    if (indexOfCurrentQuestion + 1 < numberOfQuestions) {
      this.setCurrentQuestion(
        this.getCurrentCategory().questions[indexOfCurrentQuestion + 1],
      );
    } else {
      // Last question of current category. Set currentQuestion to undefined for CategoryComponent
      this.setCurrentQuestion(undefined);
    }
  }

  saveAnswer(answer) {
    answer = this.calculateAnswerCo2e(answer);
    this.updateResult(answer);

    const question = this.getCurrentQuestion();
    if (
      (question.index === 14 && answer.index === 219) ||
      (question.index === 25 && answer.index === 405)
    ) {
      this.saveResult();
      this.skipNextQuestion();
    } else if (question.index === 10 && answer.index === 201) {
      this.skipNextTwoQuestions();
      this.saveResult();
    } else {
      this.saveResult();
      this.goToNextQuestion();
    }
  }

  skipNextQuestion() {
    const indexOfCurrentQuestion = this.getCurrentCategory().questions.indexOf(
      this.getCurrentQuestion(),
    );
    const numberOfQuestions = this.getCurrentCategory().questions.length;

    this.getResult().answers.push({ answer: null, date: new Date() });

    if (indexOfCurrentQuestion + 2 < numberOfQuestions) {
      this.setCurrentQuestion(
        this.getCurrentCategory().questions[indexOfCurrentQuestion + 2],
      );
    } else {
      // Last question of current category. Set currentQuestion to undefined for CategoryComponent
      this.setCurrentQuestion(undefined);
    }
  }

  skipNextTwoQuestions() {
    const indexOfCurrentQuestion = this.getCurrentCategory().questions.indexOf(
      this.getCurrentQuestion(),
    );
    const numberOfQuestions = this.getCurrentCategory().questions.length;

    this.getResult().answers.push({ answer: null, date: new Date() });
    this.getResult().answers.push({ answer: null, date: new Date() });

    if (indexOfCurrentQuestion + 3 < numberOfQuestions) {
      this.setCurrentQuestion(
        this.getCurrentCategory().questions[indexOfCurrentQuestion + 3],
      );
    } else {
      // Last question of current category. Set currentQuestion to undefined for CategoryComponent
      this.setCurrentQuestion(undefined);
    }
  }

  goToPreviousQuestion() {
    if (this.getCurrentQuestion() && this.getCurrentQuestion().index === 1) {
      // If first question -> navigate to the landing page
      this.router.navigate(['/']);
    } else {
      // Index of the question in category
      const indexOfCurrentQuestion = this.getCurrentCategory().questions.indexOf(
        this.getCurrentQuestion(),
      );

      if (indexOfCurrentQuestion === 0) {
        // First question in a category -> previous category
        this.goToPreviousCategory();
      } else {
        const lastAnswer = this.getResult().answers[
          this.getResult().answers.length - 1
        ];
        const secondLastAnswer = this.getResult().answers[
          this.getResult().answers.length - 2
        ];

        let lastQuestion;
        if (this.getCurrentQuestion() === undefined) {
          lastQuestion = this.getCurrentCategory().questions[
            this.getCurrentCategory().questions.length - 1
          ];
        } else if (lastAnswer.answer === null) {
          lastQuestion = this.getCurrentCategory().questions[
            indexOfCurrentQuestion - 2
          ];
          if (secondLastAnswer && secondLastAnswer.answer === null) {
            lastQuestion = this.getCurrentCategory().questions[
              indexOfCurrentQuestion - 3
            ];
          }
        } else {
          lastQuestion = this.getCurrentCategory().questions[
            indexOfCurrentQuestion - 1
          ];
        }
        this.setCurrentQuestion(lastQuestion);
        this.removePreviousAnswer();
      }
    }
  }

  removePreviousAnswer() {
    const result = this.getResult();
    const lastAnswer = result.answers.pop();
    if (lastAnswer && lastAnswer.answer && lastAnswer.answer.co2e) {
      result.co2e -= lastAnswer.answer.co2e;
      result.categoryCO2e.map(category => {
        if (this.getCurrentCategory()._id === category.category._id) {
          category.co2e -= lastAnswer.answer.co2e;
        }
      }, this);
    }
    this.setResult(result);
    this.saveResult();
    if (lastAnswer && lastAnswer.answer === null) {
      this.removePreviousAnswer();
    }
  }

  updateResult(answer) {
    this.getResult().answers.push({
      answer: answer,
      date: new Date(),
    });
    if (answer.co2e) {
      this.getResult().co2e += answer.co2e;
      this.updateCategoryCo2e(answer.co2e);
    }
  }

  updateCategoryCo2e(co2e) {
    const result = this.getResult();
    result.categoryCO2e.map(category => {
      if (this.getCurrentCategory()._id === category.category._id) {
        category.co2e += co2e;
      }
    }, this);
    this.setResult(result);
  }

  calculateAnswerCo2e = answer => {
    const $F$40 = () => {
      return this.getResult().answers[4].answer.multiplier[2];
    };
    const $G$48 = () => {
      return this.getResult().answers[4].answer.multiplier[1];
    };
    const $I$12 = () => {
      return this.getResult().answers[0].answer.multiplier;
    };
    const $I$20 = () => {
      return this.getResult().answers[1].answer.multiplier[0];
    };
    const $I$25 = () => {
      return this.getResult().answers[2].answer.multiplier[0];
    };
    const $I$26 = () => {
      return this.getResult().answers[2].answer.multiplier[1];
    };
    const $I$76 = () => {
      return this.getResult().answers[9].answer.multiplier;
    };
    const $J$17 = () => {
      return 7.285;
    };
    const $J$18 = () => {
      return 0.1508;
    };

    switch (this.getCurrentQuestion().index) {
      // 1st category
      case 2: {
        answer.multiplier[0] = answer.multiplier[1] / $I$12();
        return answer;
      }
      case 3: {
        answer.multiplier[1] =
          $I$20() * $J$17() +
          2000 * answer.multiplier[0] +
          $I$20() * 240 * $J$18();

        answer.co2e =
          $I$20() * $J$17() +
          2000 * answer.multiplier[0] +
          $I$20() * 240 * $J$18();
        return answer;
      }
      case 5: {
        let building;
        let heating;

        if (answer.index === 118) {
          if (this.getResult().answers[3].answer.index === 115) {
            // Before 1990 and Block of flats
            building =
              $I$20() * 8 + ((1400 + ($I$12() - 1) * 500) / $I$12()) * $I$25();
            heating =
              240 *
              $I$20() *
              (0.147 * 0.861 + $I$25() * 0.077 + 0.265 * 0.037 + 0.199 * 0.011);
          } else if (this.getResult().answers[3].answer.index === 116) {
            // Before 1990 and Single-family house
            building =
              $I$20() * 6.9 +
              ((4600 + ($I$12() - 1) * 900) / $I$12()) * $I$25();
            heating =
              240 *
              $I$20() *
              (0.014 * 0.414 +
                $I$25() * 0.28 +
                ($I$25() / 2.425) * 0.143 +
                0.265 * 0.093 +
                0.267 * 0.067);
          } else if (this.getResult().answers[3].answer.index === 117) {
            // Before 1990 and Terraced house
            building =
              $I$20() * 6.9 +
              ((2600 + ($I$12() - 1) * 700) / $I$12()) * $I$25();
            heating =
              240 *
              $I$20() *
              (0.267 * 0.525 +
                $I$25() * 0.285 +
                ($I$25() / 2.425) * 0.115 +
                0.265 * 0.033 +
                0.014 * 0.029);
          }
        } else if (answer.index === 119) {
          if (this.getResult().answers[3].answer.index === 115) {
            // 1990 - 2010 and Block of flats
            building =
              $I$20() * 8 + ((1400 + ($I$12() - 1) * 500) / $I$12()) * $I$25();
            heating =
              160 *
              $I$20() *
              (0.147 * 0.861 + $I$25() * 0.077 + 0.265 * 0.037 + 0.199 * 0.011);
          } else if (this.getResult().answers[3].answer.index === 116) {
            // 1990 - 2010 and Single-family house or semi-detached house
            building =
              $I$20() * 6.9 +
              ((4600 + ($I$12() - 1) * 900) / $I$12()) * $I$25();
            heating =
              160 *
              $I$20() *
              (0.014 * 0.414 +
                $I$25() * 0.28 +
                ($I$25() / 2.425) * 0.143 +
                0.265 * 0.093 +
                0.147 * 0.067);
          } else if (this.getResult().answers[3].answer.index === 117) {
            // 1990 - 2010 and Terraced house
            building =
              $I$20() * 6.9 +
              ((2600 + ($I$12() - 1) * 700) / $I$12()) * $I$25();
            heating =
              160 *
              $I$20() *
              (0.147 * 0.525 +
                $I$25() * 0.285 +
                ($I$25() / 2.425) * 0.115 +
                0.265 * 0.033 +
                0.014 * 0.029);
          }
        } else if (answer.index === 120) {
          if (this.getResult().answers[3].answer.index === 115) {
            // After 2010 and Block of flats
            building =
              $I$20() * 8 + ((1400 + ($I$12() - 1) * 500) / $I$12()) * $I$25();
            heating =
              130 *
              $I$20() *
              (0.147 * 0.861 + $I$25() * 0.077 + 0.265 * 0.037 + 0.199 * 0.011);
          } else if (this.getResult().answers[3].answer.index === 116) {
            // After 2010 and Single-family house or semi-detached house
            building =
              $I$20() * 6.9 +
              ((4600 + ($I$12() - 1) * 900) / $I$12()) * $I$25();
            heating =
              130 *
              $I$20() *
              (0.014 * 0.414 +
                $I$25() * 0.28 +
                ($I$25() / 2.425) * 0.143 +
                0.265 * 0.093 +
                0.147 * 0.067);
          } else if (this.getResult().answers[3].answer.index === 117) {
            // After 2010 and Terraced house
            building =
              $I$20() * 6.9 +
              ((2600 + ($I$12() - 1) * 700) / $I$12()) * $I$25();
            heating =
              130 *
              $I$20() *
              (0.147 * 0.525 +
                $I$25() * 0.285 +
                ($I$25() / 2.425) * 0.115 +
                0.265 * 0.033 +
                0.014 * 0.029);
          }
        }

        answer.co2e = building - (2000 * $I$25() + $J$17() * 40);
        answer.multiplier[1] = heating;
        answer.multiplier[2] = building;
        return answer;
      }
      case 6: {
        switch (answer.index) {
          case 124:
            answer.multiplier[0] = $I$25();
            break;
          case 127:
            answer.multiplier[0] = $I$25() / ((2.6 + 2.25) / 2);
            break;
          case 128:
            answer.multiplier[0] = 0;
            break;
        }

        answer.co2e =
          answer.multiplier[0] *
            this.getResult().answers[1].answer.multiplier[0] *
            this.getResult().answers[4].answer.multiplier[0] -
          240 * this.getResult().answers[1].answer.multiplier[0] * $J$18();

        answer.multiplier[1] =
          $I$20() * this.getResult().answers[4].answer.multiplier[0];

        return answer;
      }
      case 7: {
        switch (answer.index) {
          case 129:
            answer.co2e = 0;
            break;
          case 130:
            answer.co2e =
              0.1 *
              this.getResult().answers[5].answer.multiplier[1] *
              this.getResult().answers[5].answer.multiplier[0];
            break;
          case 131:
            answer.co2e =
              0.25 *
              this.getResult().answers[5].answer.multiplier[1] *
              this.getResult().answers[5].answer.multiplier[0];
            break;
        }
        return answer;
      }
      case 8: {
        if (answer.index === 132) {
          answer.co2e =
            -0.1 *
            (this.getResult().answers[6].answer.co2e +
              this.getResult().answers[5].answer.multiplier[1] *
                this.getResult().answers[5].answer.multiplier[0]);
        } else if (answer.index === 133) {
          answer.co2e = 0;
        } else if (answer.index === 134) {
          answer.co2e =
            0.1 *
            (this.getResult().answers[6].answer.co2e +
              this.getResult().answers[5].answer.multiplier[1] *
                this.getResult().answers[5].answer.multiplier[0]);
        }
        return answer;
      }
      case 9: {
        if (answer.index === 135) {
          // About 30 minutes
          if (this.getResult().answers[5].answer.index === 128) {
            answer.co2e =
              52 * (0.00032 * (360 - 672) + (360 - 672) * 0.04 * 0.266);
          } else {
            answer.co2e =
              52 *
              (0.00032 * (360 - 672) +
                (360 - 672) *
                  0.04 *
                  this.getResult().answers[5].answer.multiplier[0]);
          }
        } else if (answer.index === 137) {
          // About 120 minutes
          if (this.getResult().answers[5].answer.index === 128) {
            answer.co2e =
              52 * (0.00032 * (1260 - 672) + (1260 - 672) * 0.04 * 0.266);
          } else {
            answer.co2e =
              52 *
              (0.00032 * (1260 - 672) +
                (1260 - 672) *
                  0.04 *
                  this.getResult().answers[5].answer.multiplier[0]);
          }
        } else {
        }
        return answer;
      }
      // 2nd category
      case 11: {
        if (answer.index === 208) {
          // Electricity
          answer.multiplier[0] = (($I$25() + 0.281) / 2) * 0.1;
        }
        answer.multiplier[3] =
          $I$76() * (answer.multiplier[0] + answer.multiplier[1]);
        return answer;
      }
      case 12: {
        const F87 = this.getResult().answers[10].answer.multiplier[0];
        const G87 =
          this.getResult().answers[10].answer.multiplier[1] / answer.multiplier;
        answer.co2e = $I$76() * (F87 + G87);
        return answer;
      }
      case 15: {
        answer.co2e =
          this.getResult().answers[13].answer.multiplier / answer.multiplier;
        return answer;
      }
      // 3rd category
      case 18: {
        answer.co2e =
          (answer.multiplier / 7 - 1.42) *
          309.3959 *
          this.getResult().answers[16].answer.multiplier;
        return answer;
      }
      case 19: {
        answer.co2e =
          (answer.multiplier - 15.9) *
          21.43739 *
          this.getResult().answers[16].answer.multiplier;
        return answer;
      }
      case 20: {
        answer.co2e =
          (answer.multiplier / 7 - 2.4) *
          113.807 *
          this.getResult().answers[16].answer.multiplier;
        return answer;
      }
      // 4th category
      case 25: {
        answer.multiplier =
          $I$25() * answer.multiplier[0] + answer.multiplier[1];
        return answer;
      }
      case 26: {
        answer.co2e =
          this.getResult().answers[24].answer.multiplier / answer.multiplier;
        return answer;
      }
      default: {
        return answer;
      }
    }
  };
}
