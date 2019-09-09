import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../../environments/environment';
import { ConstantHelper } from 'src/app/Helpers/ConstantsHelpers';

@Injectable()
export class CreateEventService {
    public headerCustomize : HttpHeaders;
    constructor(private http: HttpClient, private constant:ConstantHelper) {
        this.headerCustomize = this.constant.getHeaders();
     }      

    register(form: any): Observable<Response> {                   
        return this.http
        .post(`${environment.apiUrl}/guarda_imagen`, form, { 
            headers: this.headerCustomize             
            })
        .map((res: Response) => res)
        .catch(this.handleError);
    }

    registerEvent(eventos: any): Observable<Response>{
        var test = this.constant.getHeaders(true); 
        return this.http
        .post(`${environment.apiUrl}/guarda_evento`, eventos,{ 
            headers: test,                        
            })
        .map((res: Response) => res)
        .catch(this.handleError);
    }
    
    getCities(){
        return this.http
        .get(`${environment.apiUrl}/obtener_ciudades`, { 
            headers: this.headerCustomize             
            })
        .map((res: Response) => res)
        .catch(this.handleError);
    }
    getCategory(){
        var headers = this.constant.getHeaders();       
        return this.http
        .get(`${environment.apiUrl}/obtener_categorias`, { 
            headers: this.headerCustomize             
            })
        .map((res: Response) => res)
        .catch(this.handleError);
    }

    handleError(handleError: any): Observable<Response> {
        throw new Error('Method not implemented.');
    }
}