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
  gameMode: string = '';
  username: string = '';
  categoryId: number = 0;
  topicId: number = 0;
  result: any = 0;

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

  async fetchQuestions(
    mode: string,
    modeId: number = 0,
    question_amount: number
  ) {
    try {
      const response = await this.httpClient
        .post(`${api_url}/get-questions`, { mode, modeId, question_amount })
        .toPromise();
      this.questions = response;
    } catch (error) {
      console.error('Error occurred:', error);
    }

    this.gameMode = mode;
    if (mode === 'category') {
      this.categoryId = modeId;
    } else if (mode === 'topic') {
      this.topicId = modeId;
    }
  }

  setPlayerAnswer(qIndex: number, choice: number) {
    this.questions.questions[qIndex].answerUser = choice;
  }

  async processQuizEnd() {
    try {
      const response = await this.httpClient
        .post(`${api_url}/process-quiz-result`, {
          question_list: this.questions,
          game_mode: this.gameMode,
          username: this.username,
          category_id: this.categoryId,
          topic_id: this.topicId,
        })
        .toPromise();
      this.result = response;
      console.log(this.result);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }
}

// async function fetch_highscores(mode, category, topic) {
//   let highscores = [];

//   return fetch(`${api_url}get-highscores`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ mode, category, topic }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       highscores = data.highscores;
//       return highscores;
//     })
//     .catch((error) => {
//       createErrorBox('Highscores konnten nicht gefetcht werden!');
//       console.error('Error:', error);
//       return highscores;
//     });
// }
