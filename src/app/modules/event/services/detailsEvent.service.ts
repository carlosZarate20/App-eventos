import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment';
import { ConstantHelper } from 'src/app/Helpers/ConstantsHelpers';
import * as _ from 'lodash';

@Injectable()
export class DetailsEventService {
    public headerCustomize : HttpHeaders;
    
    constructor(private http: HttpClient, private constant:ConstantHelper) { 
        this.headerCustomize = this.constant.getHeaders();
    }
    

    getDetailsEvent(id: any){
        let body = id.toString();
        const params = new HttpParams()
        .set('id', id);

        return this.http
        .get(`${environment.apiUrl}/detalle_evento/` + id)
        .map((res: Response) => res)
        .catch(this.handleError);
    }

    handleError(handleError: any): Observable<Response> {
        throw new Error('Method not implemented.');
    }
}