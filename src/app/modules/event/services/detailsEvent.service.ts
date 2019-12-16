import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment';
import { ConstantHelper } from 'src/app/Helpers/ConstantsHelpers';

@Injectable()
export class DetailsEventService {
    public headerCustomize: HttpHeaders;

    constructor(private http: HttpClient, private constant: ConstantHelper) {
        this.headerCustomize = this.constant.getHeaders();
    }

    getDetailsEvent(id: any) {
        return this.http
        .get(`${environment.apiUrl}/detalle_evento/${id}`)
        .map((res: Response) => res)
        .catch(this.handleError);
    }
    getListSeat(ticketId: any){
        const headers = this.constant.getHeaders();
        return this.http
        .get(`${environment.apiUrl}/obtener_filas_asientos/${ticketId}`,  {
            headers: this.headerCustomize
            })
        .map((res: Response) => res)
        .catch(this.handleError);
    }
    saveTickectSeat(from: any){
        const test = this.constant.getHeaders(true);
        return this.http
        .post(`${environment.apiUrl}/comprar_asiento_mesa`, from, {
            headers: test
            })
        .map((res: Response) => res)
    }

    handleError(handleError: any): Observable<Response> {
        throw new Error('Method not implemented.');
    }
}
