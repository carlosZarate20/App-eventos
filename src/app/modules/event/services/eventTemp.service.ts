import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment';
import { ConstantHelper } from 'src/app/Helpers/ConstantsHelpers';

@Injectable()
export class EventTempService {
    public headerCustomize: HttpHeaders;

    constructor(private http: HttpClient, private constant: ConstantHelper) {
        this.headerCustomize = this.constant.getHeaders();
    }
    getListEventsBuy(userId: any) {
        const headers = this.constant.getHeaders();
        return this.http
        .get(`${environment.apiUrl}/obtener_entradas/${userId}`,  {
            headers: this.headerCustomize
            })
        .map((res: Response) => res)
        .catch(this.handleError);
    }

    handleError(handleError: any): Observable<Response> {
        throw new Error('Method not implemented.');
    }
}
