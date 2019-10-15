import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient, private router: Router) { }

    login(form: any): Observable<Response> {
        return this.http
        .post(`${environment.apiUrl}/login`, form)
        .map((res: Response) => res);
    }

    getToken(): string  {
        return localStorage.getItem('token');
    }

    getTokenExpiration(): string {
        return localStorage.getItem('tokenExpiration');
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        localStorage.clear();
    }

    getDecodedAccessToken(): any {
      const token = this.getToken();
      try {
          return jwt_decode(token);
      } catch (Error) {
          return null;
      }
    }

    isLogged(): boolean {
        const exp = this.getTokenExpiration();
        if (!exp) {
          return false;
        }
        const now = new Date().getTime();
        const dateExp = new Date(exp).getTime();
        if (now >= dateExp) {
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiration');
          return false;

        } else {
          return true;
        }
      }

    handleError(handleError: any): Observable<Response> {
        throw new Error('Method not implemented.');
    }
}
