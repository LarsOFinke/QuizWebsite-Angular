import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api_url } from '../../../main';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectionService {
  constructor(private httpClient: HttpClient) {}

  fetchCategories(): any {
    return this.httpClient.get(`${api_url}/get-categories`).subscribe({
      next: (resData) => {
        console.log(resData);
      }
    });
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
