import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginDetails) {
    return this.http.post('/api/users/login', loginDetails).pipe(
      map((res: any) => {
        localStorage.setItem(TOKEN_KEY, res.token);
        return res;
      })
    );
  }

  isLoggedIn() {
    return localStorage.getItem(TOKEN_KEY) ? true : false;
  }
}
