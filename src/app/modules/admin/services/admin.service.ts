import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment';
import { ConstantHelper } from 'src/app/Helpers/ConstantsHelpers';
import * as _ from 'lodash';

@Injectable()
export class AdminEventService {
    public headerCustomize: HttpHeaders;

    constructor(private http: HttpClient, private constant: ConstantHelper) {
        this.headerCustomize = this.constant.getHeaders();
    }
    getBank(name: any) {
        const headers = this.constant.getHeaders();
        return this.http
        .get(`${environment.apiUrl}/obtener_bancos/${name}`, {
            headers: this.headerCustomize
            })
        .map((res: Response) => res)
        .catch(this.handleError);
    }

    createBank(bank: any): Observable<Response> {
        const test = this.constant.getHeaders(true);
        return this.http
        .post(`${environment.apiUrl}/creacion_banco`, bank, {
            headers: test
            })
        .map((res: Response) => res)
    }
    editBank(value: any) {
        const headers = this.constant.getHeaders();
        return this.http
        .post(`${environment.apiUrl}/editar_banco`, value, {
            headers: this.headerCustomize
            })
        .map((res: Response) => res)
        .catch(this.handleError);
    }
    deleteBank(id: any) {
        const headers = this.constant.getHeaders();
        return this.http
        .post(`${environment.apiUrl}/eliminar_banco`, id, {
            headers: this.headerCustomize
            })
        .map((res: Response) => res)
        .catch(this.handleError);
    }
    getBankEdit(id: any) {
        const headers = this.constant.getHeaders();
        return this.http
        .get(`${environment.apiUrl}/obtener_banco/${id}`, {
            headers: this.headerCustomize
            })
        .map((res: Response) => res)
        .catch(this.handleError);
    }
    
    getCategory(name: any) {
        const headers = this.constant.getHeaders();
        return this.http
        .get(`${environment.apiUrl}/obtener_categorias/${name}`, {
            headers: this.headerCustomize
            })
        .map((res: Response) => res)
        .catch(this.handleError);
    }

    createCategory(categorie: any): Observable<Response> {
        const test = this.constant.getHeaders(true);
        return this.http
        .post(`${environment.apiUrl}/creacion_categoria`, categorie, {
            headers: test
            })
        .map((res: Response) => res)
    }
    editCategory(value: any) {
        const headers = this.constant.getHeaders();
        return this.http
        .post(`${environment.apiUrl}/editar_categoria`, value, {
            headers: this.headerCustomize
            })
        .map((res: Response) => res)
        .catch(this.handleError);
    }
    deleteCategory(id: any) {
        const headers = this.constant.getHeaders();
        return this.http
        .post(`${environment.apiUrl}/eliminar_categoria`, id, {
            headers: this.headerCustomize
            })
        .map((res: Response) => res)
        .catch(this.handleError);
    }
    getCategoryEdit(idCategory: any) {
        const headers = this.constant.getHeaders();
        return this.http
        .get(`${environment.apiUrl}/obtener_categoria/${idCategory}`, {
            headers: this.headerCustomize
            })
        .map((res: Response) => res)
        .catch(this.handleError);
    }

    
    handleError(handleError: any): Observable<Response> {
        throw new Error('Method not implemented.');
    }
}
