import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LoginService } from './services/login.service';
import { Constants } from './modules/shared/util/constants';
import { SearchEventService } from './services/searchEvent.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, AfterViewInit {
  eventForm: FormGroup;
  public model: any = {};
  public keyword: any = {};
  public usuario: any = [];
  public role: any = [];
  public eventSearch: any = [];

  public modalSearch: Boolean = false;
  public roleAdmin: Boolean = false;
  public roleClient: Boolean = false;
  public roleThirdUser: Boolean = false;
  public validateFilter: Boolean = false;
  public loading: Boolean = false;

  constructor( private activatedRoute: ActivatedRoute, private router: Router, public loginService: LoginService,
               public searchService: SearchEventService, private fb: FormBuilder) {
    this.model.menu = {};
    this.model.menu.inicio = { display: true, items: [] };
    this.model.menu.login = { display: true, items: [] };
    this.model.menu.register = { display: true, items: [] };
    this.model.menu.create = { display: true, items: [] };
    this.keyword = [];

    this.model.menu.inicio.items.push({ url: '/event/events/', name: 'Inicio' });
    this.model.menu.login.items.push({ url: '/event/login/', name: 'Iniciar Sesion' });
    this.model.menu.register.items.push({ url: '/event/register/', name: 'Registrarse' });
    this.model.menu.create.items.push({ url: '/event/create/', name: 'Crear Evento' });
    this.model.listEvent = [];
   }

  ngOnInit() {
    const values = this.loginService.getDecodedAccessToken();
    if (values != null || values != undefined) {
      console.log(values);
      this.usuario = values.Name;
      this.role = values.Role;
      if (this.role === Constants.ROLE_CLIENT ) {
        this.roleClient = true;
        console.log('El rol ingresado es Cliente');
      } else {
        this.roleClient = false;
        console.log('El rol ingresado es publico general');
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
    this.router.navigate(['/event/events']);
  }

  activateSearch() {
    this.modalSearch = true;
    console.log('abrio modal');
  }

  desactivateSearch() {
    this.modalSearch = false;
    console.log('cerro modal');
  }

  findEvent() {
    const wordSearch = this.keyword;
    this.model.listEvent = [];
    setTimeout(() => {
      this.loading = true;
      if(wordSearch != '' ) {
        if (wordSearch == this.keyword) {
          if (this.keyword) {
            const events = {
              name: this.keyword,
              startDate: '',
              endDate: ''
            }
            console.log(events);
            this.searchService.findEventSearch(events).subscribe(
              (res: any) => {
                this.loading = false;
                this.model.listEvent = res;
                for (let i = 0; i < this.model.listEvent.length; i++) {
                  this.model.listEvent[i].image = `${environment.apiUrl}` + this.model.listEvent[i].image;
                }
              },
              err => {
              }
            );
          } else {
          }
        }
      } else {
        this.model.listEvent = [];
        this.loading = false;
      }

    }, 1000);
  }

  passDetailsView(id: any) {
    this.router.navigate(['/event/detail' , id]);
  }
  home() {
    this.router.navigate(['/event/events']);
  }

}
