import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }
    login(form: any): Observable<Response>{
        return this.http
        .post('http://edumoreno27-001-site6.etempurl.com/login', form)
        .map((res: Response) => res)
        .catch(this.handleError);
    }
    handleError(handleError: any): Observable<Response> {
        throw new Error("Method not implemented.");
    }
}