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
}

// async function fetch_topics() {
//   topics = [];

//   return fetch(`${api_url}get-topics`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       topics = data.topics;
//     })
//     .catch((error) => {
//       createErrorBox(
//         'Themen konnten nicht gefetcht werden! Verbindung zum Server steht?'
//       );
//       console.error('Error:', error);
//     });
// }
