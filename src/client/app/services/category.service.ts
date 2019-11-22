import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService {
  constructor(public http: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.http.get('/api/categories');
  }

  getCategoryByName(category): Observable<any> {
    return this.http.get('/api/category/name/' + category);
  }
}
