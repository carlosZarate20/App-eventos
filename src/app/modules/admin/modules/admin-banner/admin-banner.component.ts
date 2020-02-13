import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminEventService } from '../../services/admin.service';
import { LoginService } from 'src/app/modules/event/services/login.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
    selector: 'app-admin-banner',
    templateUrl: './admin-banner.component.html',
    styleUrls: ['./admin-banner.component.css']
})

export class AdminBannerComponent implements OnInit {
    public model: any = {};
    public nameBank: string;
    public validateCreate = false;
    public validateEdit = false;
    public loading = false;
    public message: any = '';
    public checkBanner: boolean;

    constructor(public bankService: AdminEventService, public loginService: LoginService) {
        this.model.listEvent = [];
        this.model.listBank = [];
        this.model.listBankName = [];
    }
    ngOnInit() {
        this.getListEvent();
        this.model.nameBank = '';
        this.model.nameEditBank = '';
        this.model.id = '';
        this.model.searchBank = '';
    }
    getListEvent() {
        this.loading = true;
        this.bankService.getEvent().subscribe(
            res => {
                this.model.listEvent = res;
                this.loading = false;
            }
        );
    }

    validateCheked(idBanner: any, inBannerPostValue: any, inMainViewValue: any) {
        const bannerValues = {
            id: idBanner,
            inBannerPost: inBannerPostValue,
            inMainView: inMainViewValue

        };
        Swal.fire({
            title: '¿Estas Seguro de editar el banco?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            this.loading = true;
            if (result.value) {
                this.bankService.editEvent(bannerValues).subscribe(
                    res => {
                        this.loading = false;
                        this.getListEvent();
                    },
                    err => {
                        this.loading = false;
                        this.message = err.error;
                        Swal.fire('Oops...', this.message, 'error');
                    }
                );
                Swal.fire(
                    'Editado!',
                    'Se actualizo el evento correctamente.',
                    'success'
                );
            } else {
                this.getListEvent();
                this.loading = false;
            }
        });
    }

}
