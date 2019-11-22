import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class NavigationService {
  constructor(private http: HttpClient) {}

  getNavigation(): Observable<any> {
    return this.http.get('/api/navigation');
  }
}
