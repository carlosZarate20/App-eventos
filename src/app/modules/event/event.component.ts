import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  public model: any = {};
  public usuario: any = [];

  public modalSearch: Boolean = false;

  constructor( private activatedRoute: ActivatedRoute, private router: Router, public loginService: LoginService) {
    this.model.menu = {};
    this.model.menu.inicio = { display: true, items: [] };
    this.model.menu.login = { display: true, items: [] };
    this.model.menu.register = { display: true, items: [] };
    this.model.menu.create = { display: true, items: [] };

    this.model.menu.inicio.items.push({ url: '/event/events/', name: 'Inicio' });
    this.model.menu.login.items.push({ url: '/event/login/', name: 'Iniciar Sesion' });
    this.model.menu.register.items.push({ url: '/event/register/', name: 'Registrarse' });
    this.model.menu.create.items.push({ url: '/event/create/', name: 'Crear Evento' });
   }

  ngOnInit() {
    let values = this.loginService.getDecodedAccessToken();
    if(values!= null || values!= undefined)
    {
      this.usuario = values.Name;
    }else {
      this.usuario = null;
    }
   
   
  }

  logout() {
    this.loginService.logout();
  }

  activateSearch(){
    this.modalSearch = true;
    console.log('abrio modal');
  }

  desactivateSearch(){
    this.modalSearch = false;
    console.log('cerro modal');
  }

}