import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  public model: any = {};
  public usuario: any = [];

  constructor( private activatedRoute: ActivatedRoute, private router: Router) {
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
    this.usuario = localStorage.getItem('usuario');
  }

  logout() {
    localStorage.removeItem(this.usuario);
    localStorage.clear();
    console.log('Fin de sesion');
    this.router.navigate(['/event/events']);
  }

}
