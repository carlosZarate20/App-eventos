import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RegisterUserService {

    constructor(private http: HttpClient) { }

    register(form: any): Observable<Response> {
        return this.http
        .post(`${environment.apiUrl}/creacion_usuario`, form)
        .map((res: Response) => res);
    }
    getDistrict(): Observable<Response> {
        return this.http
        .get(`${environment.apiUrl}/listar_distritos`)
        .map((res: Response) => res)
        .catch(this.handleError);
    }
    handleError(handleError: any): Observable<Response> {
        throw new Error('Method not implemented.');
    }
}
