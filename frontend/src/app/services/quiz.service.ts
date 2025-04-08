import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { api_url } from '../../main';
import { catchError, map, throwError } from 'rxjs';
import { IQuestion } from '../interfaces/i-question';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private httpClient = inject(HttpClient);

  questions: { questions: IQuestion[] } | any = [];
  highscores: any = [];

  gameMode: string = '';
  username: string = 'guest';
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
      const response: { questions: IQuestion[] } | any = await this.httpClient
        .post(`${api_url}/get-questions`, { mode, modeId, question_amount })
        .toPromise();
      this.questions = response;
    } catch (error) {
      console.error('Error occurred:', error);
    }

    this.gameMode = mode;
    if (mode === 'categ') {
      this.categoryId = modeId;
    } else if (mode === 'topic') {
      this.topicId = modeId;
    }
  }

  setPlayerAnswer(qIndex: number, choice: number) {
    this.questions.questions[qIndex].answerUser = choice;
  }

  fetchQuestionImage(imageId: number) {
    return this.httpClient.get<Blob>(`/api/serve-image/${imageId}`, {
      responseType: 'blob' as 'json',  // Ensure you get the image as a Blob
      headers: {
        'Accept': 'image/jpeg'  // Tell the server that we expect an image (you can specify image/png if needed)
      }
    });
  }

  async processQuizEnd() {
    try {
      const response = await this.httpClient
        .post(`${api_url}/process-quiz-result`, {
          question_list: this.questions.questions,
          game_mode: this.gameMode,
          username: this.username,
          category_id: this.categoryId,
          topic_id: this.topicId,
        })
        .toPromise();
      this.result = response;
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }

  async fetchHighscores(mode: string, category_id: number, topic_id: number) {
    try {
      const response = await this.httpClient
        .post(`${api_url}/get-highscores`, { mode, category_id, topic_id })
        .toPromise();
      this.highscores = response;
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }
}
