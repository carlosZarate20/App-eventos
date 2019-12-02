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
    public message: any = '';

    constructor(public bankService: AdminEventService, public loginService: LoginService) {
        this.model.listBank = [];
        this.model.listBankName = [];
        
    }
    ngOnInit() {
        this.getListBank('');
        this.model.nameBank = '';
        this.model.nameEditBank = '';
        this.model.id = '';
        this.model.searchBank = '';
    }

    getListBank(value: any) {
        this.bankService.getBank('').subscribe(
            res => {
                this.model.listBank = res;
                console.log(this.model.listBank);
            }
        );
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
            this.validateCreate = false;
            const tokenAcces = this.loginService.getDecodedAccessToken();

            const bank = {
                userId: tokenAcces.Id,
                name: this.model.nameBank
            };
            this.bankService.createBank(bank).subscribe(
                (res: any) => {
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
                if (result.value) {
                    this.bankService.editBank(editBank).subscribe(
                        res => {
                            $('#myModalEdit').modal('hide');
                            this.getListBank('');
                        },
                        err => {
                        }
                    );
                    Swal.fire(
                        'Editado!',
                        'El banco ha sido editada correctamente.',
                        'success'
                    );
                }
            });
        } else {
            this.validateEdit = true;
        }
    }
    getEditBank(id: any) {
        this.bankService.getBankEdit(id).subscribe(
            (res: any) => {
                this.model.listBankName = res;
                this.model.nameEditBank = this.model.listBankName.name;
                this.model.id = this.model.listBankName.id;
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
                this.bankService.deleteBank(bankDelete).subscribe(
                    res => {
                        this.getListBank('');
                    },
                    err => {
                    }
                );
                Swal.fire(
                    'Eliminado!',
                    'El banco ha sido eliminado.',
                    'success'
                );
            }
        });
    }

    findBank() {
        const wordSearch = this.model.searchBank;
        setTimeout(() => {
            this.loading = true;
            if (wordSearch != '' ) {
              if (wordSearch == this.model.searchBank) {
                if (this.model.searchBank) {
                  this.bankService.getBank(wordSearch).subscribe(
                    (res: any) => {
                        this.loading = false;
                        this.model.listBank = res;
                    },
                    err => {
                    }
                  );
                } else {
                }
              }
            } else {
                this.getListBank('');
                this.loading = false;
            }
        }, 1000);
    }
}
