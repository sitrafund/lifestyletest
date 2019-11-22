import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResultService {
  constructor(private http: HttpClient) {}

  getResult(id): Observable<any> {
    return this.http.get('/api/extendedResultPopulated/' + id);
  }

  createResult(): Observable<any> {
    return this.http.get('/api/extendedResult');
  }

  updateResult(result): Observable<any> {
    return this.http.post('/api/extendedResult/' + result._id, result);
  }

  countResults(): Observable<any> {
    return this.http.get('/api/extendedResults/count');
  }

  saveResult(result): Observable<any> {
    return this.http.post('/api/average', result, { responseType: 'text' });
  }

  getAverages(): Observable<any> {
    return this.http.get('/api/average');
  }

  getResultCategories(): Observable<any> {
    return this.http.get('/api/resultCategories');
  }

  chooseClassification(result): Observable<any> {
    let bestCategory;
    let worstCategory;
    const averageData: Array<any> = [
      {
        index: 1,
        value: 2700,
        icon: '/assets/images/test-icon-asuminen.svg',
        color: 'orange',
      },
      {
        index: 2,
        value: 2000,
        icon: '/assets/images/test-icon-liikenne-ja-matkailu.svg',
        color: 'blue',
      },
      {
        index: 3,
        value: 2100,
        icon: '/assets/images/test-icon-ruoka.svg',
        color: 'green',
      },
      {
        index: 4,
        value: 1000,
        icon: '/assets/images/test-icon-tuotteet-ja-palvelut.svg',
        color: 'yellow',
      },
    ];

    const overAverage = [];
    const underAverage = [];
    const sameAsAverage = [];

    result.categoryCO2e.map((category, index) => {
      if (Math.ceil(category.co2e / 100) * 100 > averageData[index].value) {
        overAverage.push({
          category: category.category,
          diff:
            (Math.ceil(category.co2e / 100) * 100) / averageData[index].value,
        });
      } else if (
        Math.ceil(category.co2e / 100) * 100 <
        averageData[index].value
      ) {
        underAverage.push({
          category: category.category,
          diff:
            (Math.ceil(category.co2e / 100) * 100) / averageData[index].value,
        });
      } else {
        sameAsAverage.push({
          category: category.category,
          diff:
            (Math.ceil(category.co2e / 100) * 100) / averageData[index].value,
        });
      }
    }, this);

    if (result.co2e <= 3000 || result.co2e >= 15000) {
      return this.getResultCategories().pipe(
        map(
          categories => {
            if (result.co2e <= 3000) {
              bestCategory = categories[0];
            } else {
              bestCategory = categories[1];
            }

            return {
              bestCategory: bestCategory,
              worstCategory: worstCategory,
            };
          },
          error => {
            console.error('Failed.');
          },
        ),
      );
    } else {
      if (underAverage.length > 0) {
        // if any is underAverage
        let smallestDifference = 1;
        let smallestDifferenceCategory;
        underAverage.map(cat => {
          if (cat.diff < smallestDifference) {
            smallestDifferenceCategory = cat;
            smallestDifference = cat.diff;
          }
        });
        if (overAverage.length === 0) {
          let largestDifference = 0;
          let largestDifferenceCategory;
          underAverage.map(cat => {
            if (cat.diff > largestDifference) {
              largestDifferenceCategory = cat;
              largestDifference = cat.diff;
            }
          });
          worstCategory = largestDifferenceCategory.category;
        }
        bestCategory = smallestDifferenceCategory.category;
      }

      if (overAverage.length > 0 && overAverage.length < averageData.length) {
        // if any is overAverage
        let largestDifference = 0;
        let largestDifferenceCategory;
        overAverage.map(cat => {
          if (cat.diff > largestDifference) {
            largestDifferenceCategory = cat;
            largestDifference = cat.diff;
          }
        });
        worstCategory = largestDifferenceCategory.category;
        if (underAverage.length === 0) {
          let smallestDifferenceCategory;
          overAverage.map(cat => {
            if (cat.diff < largestDifference) {
              smallestDifferenceCategory = cat;
              largestDifference = cat.diff;
            }
          });
          bestCategory = smallestDifferenceCategory.category;
        }
      }

      if (underAverage.length === 0 && sameAsAverage.length > 0) {
        bestCategory = sameAsAverage[0].category;
      }

      return of({
        bestCategory: bestCategory,
        worstCategory: worstCategory,
      });
    }
  }
}
