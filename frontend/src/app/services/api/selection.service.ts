import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { api_url } from '../../../main';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectionService {
  private httpClient = inject(HttpClient);

  constructor() {}

  fetchCategories() {
    return this.httpClient
      .get<{ categories: [{ category: string; category_id: number }] }>(
        `${api_url}/get-categories`
      )
      .pipe(
        map((resData) => resData),
        catchError((error) => {
          console.log(error);
          return throwError(
            () => new Error('Kategorien konnten nicht gefetcht werden!')
          );
        })
      );
  }

  fetchTopics() {
    return this.httpClient
      .get<{ topics: [{ topic: string; topic_id: number }] }>(
        `${api_url}/get-topics`
      )
      .pipe(
        map((resData) => resData),
        catchError((error) => {
          console.log(error);
          return throwError(
            () => new Error('Topics konnten nicht gefetcht werden!')
          );
        })
      );
  }
}
