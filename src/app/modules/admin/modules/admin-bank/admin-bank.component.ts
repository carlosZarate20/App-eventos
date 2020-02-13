import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminEventService } from '../../services/admin.service';
import { LoginService } from 'src/app/modules/event/services/login.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
    selector: 'app-admin-bank',
    templateUrl: './admin-bank.component.html',
    styleUrls: ['./admin-bank.component.css']
})

export class AdminBankComponent implements OnInit {
    public model: any = {};
    public nameBank: string;
    public validateCreate = false;
    public validateEdit = false;
    public loading = false;
    public loading2 = false;
    public message: any = '';
    public totalPages: any;
    public modelSend: any = {};
    public pageSize: any = {};
    constructor(public bankService: AdminEventService, public loginService: LoginService) {
        this.model.listBank = [];
        this.model.listBankName = [];
        this.model.listBankAux = [];

    }
    ngOnInit() {
        this.getListBank('');
        this.model.nameBank = '';
        this.model.nameEditBank = '';
        this.model.id = '';
        this.model.searchBank = '';
    }

    getListBank(value: any, pageNext: any = null, numberRows: any = null) {
        this.loading = true;
        this.bankService.getBank(value, pageNext, numberRows).subscribe(
            res => {
                this.model.listBankAux  = res;
                this.model.listBank = this.model.listBankAux.data;
                this.pageSize = this.model.listBankAux.pageSize;
                this.totalPages = this.model.listBankAux.totalPages;
                this.loading = false;
            }
        );
    }
    paginate(event: any) {
        this.modelSend.rows = this.pageSize;
        this.modelSend.page = event.page + 1;
        this.getListBank('', this.modelSend.page, this.modelSend.rows);
    }

    validateNameBankCreate() {
        if (this.model.nameBank != '') {
            this.validateCreate = false;
        }
    }
    validateNameBankEdit() {
        if (this.model.nameBank != '') {
            this.validateEdit = false;
        }
    }
    saveBank() {
        if (this.model.nameBank != '') {
            this.loading = true;
            this.validateCreate = false;
            const tokenAcces = this.loginService.getDecodedAccessToken();

            const bank = {
                userId: tokenAcces.Id,
                name: this.model.nameBank
            };
            this.bankService.createBank(bank).subscribe(
                (res: any) => {
                    this.loading = false;
                    $('#myModal').modal('hide');
                    this.model.nameBank = '';
                    this.getListBank('');
                    Swal.fire(
                        'Registrado!',
                        'El nombre del banco ha sido registrado correctamente.',
                        'success'
                    );
                },
                (err: any) => {
                    this.loading = false;
                    this.message = err.error;
                    Swal.fire('Oops...', this.message, 'error');
                }
            );
        } else {
            this.validateCreate = true;
        }
    }
    updateBank() {
        if (this.model.nameEditBank != '') {
            this.validateEdit = false;
            const editBank = {
                id: this.model.id,
                name: this.model.nameEditBank
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
                    this.bankService.editBank(editBank).subscribe(
                        res => {
                            this.loading = false;
                            $('#myModalEdit').modal('hide');
                            this.getListBank('');
                            Swal.fire(
                                'Editado!',
                                'El banco ha sido editada correctamente.',
                                'success'
                            );
                        },
                        err => {
                            this.loading = false;
                            this.message = err.error;
                            Swal.fire('Oops...', this.message, 'error');
                        }
                    );
                } else {
                    this.loading = false;
                }
            });
        } else {
            this.loading = false;
            this.validateEdit = true;
        }
    }
    getEditBank(id: any) {
        this.loading = true;
        this.bankService.getBankEdit(id).subscribe(
            (res: any) => {
                this.model.listBankName = res;
                this.model.nameEditBank = this.model.listBankName.name;
                this.model.id = this.model.listBankName.id;
                this.loading = false;
            },
            (err: any) => {

            }
        );
    }
    deleteBank(id: any) {
        const bankDelete = {
            id: id
        };
        Swal.fire({
            title: '¿Estas Seguro de elimnar el banco?',
            text: 'No se podra revertir esto!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this.loading = true;
                this.bankService.deleteBank(bankDelete).subscribe(
                    res => {
                        this.getListBank('');
                        this.loading = false;
                        Swal.fire(
                            'Eliminado!',
                            'El banco ha sido eliminado.',
                            'success'
                        );
                    },
                    err => {
                        this.loading = false;
                        this.message = err.error;
                        Swal.fire('Oops...', this.message, 'error');
                    }
                );
            } else {
                this.loading = false;
            }
        });
    }

    findBank() {
        const wordSearch = this.model.searchBank;
        setTimeout(() => {
            this.loading2 = true;
            if (wordSearch != '' ) {
              if (wordSearch == this.model.searchBank) {
                if (this.model.searchBank) {
                  this.bankService.getBank(wordSearch).subscribe(
                    (res: any) => {
                        this.loading2 = false;
                        this.model.listBank = res.data;
                        this.pageSize = res.pageSize;
                        this.totalPages = res.totalPages;
                    },
                    err => {
                        this.loading2 = false;
                        this.message = err.error;
                        Swal.fire('Oops...', this.message, 'error');
                    }
                  );
                } else {
                }
              }
            } else {
                this.getListBank('');
                this.loading2 = false;
            }
        }, 1000);
    }
}
