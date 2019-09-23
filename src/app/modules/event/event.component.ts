import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LoginService } from './services/login.service';
import { Constants } from './modules/shared/util/constants';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, AfterViewInit {

  public model: any = {};
  public usuario: any = [];
  public role: any = [];

  public modalSearch: Boolean = false;
  public roleAdmin: Boolean = false;
  public roleClient: Boolean = false;
  public roleThirdUser: Boolean = false;
  public validateFilter: Boolean = false;

  constructor( private activatedRoute: ActivatedRoute, private router: Router, public loginService: LoginService) {
    this.model.menu = {};
    this.model.menu.inicio = { display: true, items: [] };
    this.model.menu.login = { display: true, items: [] };
    this.model.menu.register = { display: true, items: [] };
    this.model.menu.create = { display: true, items: [] };
    this.model.valueSearch = '';

    this.model.menu.inicio.items.push({ url: '/event/events/', name: 'Inicio' });
    this.model.menu.login.items.push({ url: '/event/login/', name: 'Iniciar Sesion' });
    this.model.menu.register.items.push({ url: '/event/register/', name: 'Registrarse' });
    this.model.menu.create.items.push({ url: '/event/create/', name: 'Crear Evento' });
   }

  ngOnInit() {
    const values = this.loginService.getDecodedAccessToken();
    if (values != null || values != undefined) {
      console.log(values);
      this.usuario = values.Name;
      this.role = values.Role;
      if (this.role === Constants.ROLE_ADMIN ) {
        this.roleAdmin = true;
        console.log('El rol ingresado es administrador');
      } else {
        this.roleAdmin = false;
        console.log('El rol ingresado no es administrador');
      }
    } else {
      this.usuario = null;
      this.role = null;
    }
  }
  ngAfterViewInit() {
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

  validateRoleLogged() {

  }

  findEvent() {
    console.log(this.model.valueSearch);
  }

}
