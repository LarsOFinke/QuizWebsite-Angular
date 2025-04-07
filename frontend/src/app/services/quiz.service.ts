import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { api_url } from '../../main';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private httpClient = inject(HttpClient);
  questions: any = [];

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
      .get<{
        topics: [{ category_id: number; topic: string; topic_id: number }];
      }>(`${api_url}/get-topics`)
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

  fetchQuestions(mode: string, modeId: number = 0, question_amount: number) {
    this.httpClient.post(`${api_url}/get-questions`, { mode, modeId, question_amount }).subscribe(
      (response) => {
        this.questions = response; // This will log the response from the backend
        console.log(this.questions);
      },
      (error) => {
        console.error('Error occurred:', error); // This will log any errors
      }
    );;
  }
}
