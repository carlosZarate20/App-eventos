import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventModel } from '../event/Model/event';
import { LoginService } from '../event/services/login.service';


@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    providers: []
})

export class AdminComponent implements OnInit {
    public model: any = {};
    public usuario: any = [];
    public role: any = [];
    constructor(private activatedRoute: ActivatedRoute, private router: Router, public loginService: LoginService) {
        this.model.menu = {};
        this.model.menu.categories = { display: true, items: [] };
        this.model.menu.bank = { display: true, items: [] };
        this.model.menu.messages = { display: true, items: [] };
        this.model.menu.banner = { display: true, items: [] };

        this.model.menu.categories.items.push({ url: '/admin/create', name: 'Categoría'});
        this.model.menu.bank.items.push({ url: '/admin/bank', name: 'Banco'});
        this.model.menu.messages.items.push({ url: '/admin/messages', name: 'Mensajes'});
        this.model.menu.banner.items.push({ url: '/admin/banner', name: 'Mensajes'});
        // this.model.menu.categories.items.push({ url: '/admin/maintenance', name: 'Editar Categoría'});
    }
    ngOnInit() {
        const values = this.loginService.getDecodedAccessToken();
        // tslint:disable-next-line:triple-equals
        if (values != null || values != undefined) {
            console.log(values);
            this.usuario = values.Name;
            this.role = values.Role;
          } else {
            this.usuario = null;
            this.role = null;
          }
    }
    logout() {
        this.loginService.logout();
        this.router.navigate(['/event/events']);
      }
}
