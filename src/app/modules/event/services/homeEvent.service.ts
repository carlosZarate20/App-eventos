import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HomeEventService {
    constructor(private http: HttpClient) { }

    getEvent(){
        return this.http
        .get('http://edumoreno27-001-site6.etempurl.com/listar_eventos/')
        .map((res: Response) => res)
        .catch(this.handleError);
    }
    getCategories(){
        return this.http
        .get('http://edumoreno27-001-site6.etempurl.com/listar_categorias/')
        .map((res: Response) => res)
        .catch(this.handleError);
    }
    getEventValue(categoryId: any){
        return this.http
        .get('http://edumoreno27-001-site6.etempurl.com/listar_eventos/' + categoryId)
        .map((res: Response) => res)
        .catch(this.handleError);
    }

    handleError(handleError: any): Observable<Response> {
        throw new Error('Method not implemented.');
    }
}