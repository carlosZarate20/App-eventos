import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";

@Injectable()
export class LoginService {

    constructor(private http: HttpClient, private router: Router) { }

    login(form: any): Observable<Response> {
        return this.http
        .post(`${environment.apiUrl}/login`, form)
        .map((res: Response) => res)
        .catch(this.handleError);      
    }

    getToken(): string  {
        return localStorage.getItem("token");
    }

    getTokenExpiration(): string{
        return localStorage.getItem("tokenExpiration");        
    }

    logout() {
        localStorage.removeItem("token");   
        localStorage.removeItem("tokenExpiration");
        localStorage.clear();
        this.router.navigate(['/']);        
    }

    getDecodedAccessToken(): any {
      var token = this.getToken();
      try{
          return jwt_decode(token);
      }
      catch(Error){
          return null;
      }
    }

    isLogged(): boolean {
        let exp = this.getTokenExpiration();    
        if (!exp) {      
          return false;
        }    
        var now = new Date().getTime();
        var dateExp = new Date(exp).getTime();  
    
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