import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment';
import { ConstantHelper } from 'src/app/Helpers/ConstantsHelpers';
import * as _ from 'lodash';

@Injectable()
export class SearchEventService {
    public headerCustomize: HttpHeaders;

    constructor(private http: HttpClient, private constant: ConstantHelper) {
        this.headerCustomize = this.constant.getHeaders();
    }

    findEventSearch(form: any): Observable<Response>{
        var test = this.constant.getHeaders(true); 
        return this.http
        .post('http://edumoreno27-001-site6.etempurl.com/buscar', form)
        .map((res: Response) => res)
        .catch(this.handleError);
    }

    handleError(handleError: any): Observable<Response> {
        throw new Error('Method not implemented.');
    }
}
