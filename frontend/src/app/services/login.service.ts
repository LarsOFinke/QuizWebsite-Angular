import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { api_url } from '../../main';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private httpClient = inject(HttpClient);

  // This method sends the username and password to the API endpoint
  login(username: string, password: string) {
    const payload = { username, password }; // Create the payload object

    return this.httpClient.post(`${api_url}/auth/login`, payload); // Send a POST request with the payload
  }

  async loginGuest() {
    return this.httpClient.post(`${api_url}/login-guest`, {});
  }
}
