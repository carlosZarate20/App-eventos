import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment';

@Injectable()
export class HomeEventService {
    constructor(private http: HttpClient) { }

    getEvent() {
        return this.http
        .get(`${environment.apiUrl}/listar_eventos/`)
        .map((res: Response) => res)
        .catch(this.handleError);
    }
    getCategories() {
        return this.http
        .get(`${environment.apiUrl}/listar_categorias/`)
        .map((res: Response) => res)
        .catch(this.handleError);
    }
    getEventValue(categoryId: any) {
        return this.http
        .get(`${environment.apiUrl}/listar_eventos/${categoryId}`)
        .map((res: Response) => res)
        .catch(this.handleError);
    }

    handleError(handleError: any): Observable<Response> {
        throw new Error('Method not implemented.');
    }
}
