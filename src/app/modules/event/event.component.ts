import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LoginService } from './services/login.service';
import { Constants } from './modules/shared/util/constants';
import { SearchEventService } from './services/searchEvent.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, AfterViewInit {
  eventForm: FormGroup;
  public model: any = {};
  public usuario: any = [];
  public role: any = [];

  public modalSearch: Boolean = false;
  public roleAdmin: Boolean = false;
  public roleClient: Boolean = false;
  public roleThirdUser: Boolean = false;
  public validateFilter: Boolean = false;

  constructor( private activatedRoute: ActivatedRoute, private router: Router, public loginService: LoginService, 
               public searchService: SearchEventService, private fb: FormBuilder) {
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
    this.eventForm = this.loginValidateForm();
    this.model.listEvent = [];
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

  activateSearch() {
    this.modalSearch = true;
    console.log('abrio modal');
  }

  desactivateSearch(){
    this.modalSearch = false;
    console.log('cerro modal');
  }

  findEvent(event, form: any) {
    if (form.name != '') {
      console.log(form.name);
      this.searchService.findEventSearch(form).subscribe(
        (res: any) => {
          this.model.listEvent = res;
          for(let i = 0; i < this.model.listEvent.length; i++) {
            this.model.listEvent[i].image = 'http://edumoreno27-001-site6.etempurl.com' + this.model.listEvent[i].image;
          }
        },
        err => {
        }
      );
    } else{
      this.model.listEvent = [];
    }
  }

  loginValidateForm(): FormGroup {
    return this.fb.group({
        name: ['']
    });
  }

}
