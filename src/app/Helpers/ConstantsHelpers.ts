import { LoginService } from '../modules/event/services/login.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ConstantHelper  {
    
  constructor( public loginService: LoginService) {}
    
  getHeaders(isFormData: boolean = false): HttpHeaders {
    let token = this.loginService.getToken();
    if(isFormData == true){
      return new HttpHeaders({
        'Accept': '/',
        'Authorization': `bearer ${token}`
      });    

    } else 
    {
      return new HttpHeaders({
        'Content-Type': 'application/json',        
        'Authorization': `bearer ${token}`
      });  

    }   
  }
}