import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminEventService } from '../../services/admin.service';
import { LoginService } from 'src/app/modules/event/services/login.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
    selector: 'app-create-category',
    templateUrl: './create-category.component.html',
    styleUrls: ['./create-category.component.css']
})

export class CreateCategoryComponent implements OnInit {
    public model: any = {};
    public nameCategory: string;
    public validateCreate = false;
    public validateEdit = false;
    public loading = false;
    public message: any = '';
    public totalPages: any;
    public modelSend: any = {};
    public pageSize: any;

    constructor(private createCategory: AdminEventService, public loginService: LoginService) {
        this.model.listCategory = [];
        this.model.listCategoryName = [];
        this.model.listGategoryAux = [];
    }

    ngOnInit() {
        this.getListCategory('');
        this.model.nameCategory = '';
        this.model.nameEditCategory = '';
        this.model.idCategory = '';
        this.model.searchCategory = '';
    }

    getListCategory(value: any, pageNext: any = null, numberRows: any = null) {
        this.createCategory.getCategory(value, pageNext, numberRows).subscribe(
            res => {
                this.model.listGategoryAux = res;
                console.log(this.model.listGategoryAux );
                this.model.listCategory = this.model.listGategoryAux.data;
                this.pageSize = this.model.listGategoryAux.pageSize;
                this.totalPages = this.model.listGategoryAux.totalPages;
                console.log( this.totalPages);
                console.log( this.pageSize);
            }
        );
    }
    paginate(event: any) {
        this.modelSend.rows = this.pageSize;
        this.modelSend.page = event.page + 1;
        this.getListCategory('', this.modelSend.page, this.modelSend.rows);
    }
    validateNameCategoryCreate() {
        if (this.model.nameCategory != '') {
            this.validateCreate = false;
        }
    }
    validateNameCategoryEdit() {
        if (this.model.nameEditCategory != '') {
            this.validateEdit = false;
        }
    }
    saveCategory() {
        if (this.model.nameCategory != '') {
            this.validateCreate = false;
            const tokenAcces = this.loginService.getDecodedAccessToken();

            const categories = {
                userId: tokenAcces.Id,
                name: this.model.nameCategory
            };
            this.createCategory.createCategory(categories).subscribe(
                (res: any) => {
                    $('#myModal').modal('hide');
                    this.model.nameCategory = '';
                    this.getListCategory('');
                    Swal.fire(
                        'Registrado!',
                        'La categoría ha sido registrada correctamente.',
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
    findCategory() {
        const wordSearch = this.model.searchCategory;
        setTimeout(() => {
            this.loading = true;
            if (wordSearch != '' ) {
              if (wordSearch == this.model.searchCategory) {
                if (this.model.searchCategory) {
                  this.createCategory.getCategory(wordSearch).subscribe(
                    (res: any) => {
                        this.loading = false;
                        this.model.listCategory = res;
                    },
                    err => {
                    }
                  );
                } else {
                }
              }
            } else {
                this.getListCategory('');
                this.loading = false;
            }
        }, 1000);
    }

    updateCategory() {
        if (this.model.nameEditCategory != '') {
            this.validateEdit = false;
            const editCategories = {
                id: this.model.idCategory,
                name: this.model.nameEditCategory
            };
            Swal.fire({
                title: '¿Estas Seguro de editar la categoría?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.value) {
                    this.createCategory.editCategory(editCategories).subscribe(
                        res => {
                            $('#myModalEdit').modal('hide');
                            this.getListCategory('');
                        },
                        err => {
                        }
                    );
                    Swal.fire(
                        'Editado!',
                        'La categoría ha sido editada correctamente.',
                        'success'
                    );
                }
            });
        } else {
            this.validateEdit = true;
        }
    }
    getEditCategory(idCategory: any) {
        this.createCategory.getCategoryEdit(idCategory).subscribe(
            (res: any) => {
                this.model.listCategoryName = res;
                this.model.nameEditCategory = this.model.listCategoryName.name;
                this.model.idCategory = this.model.listCategoryName.id;
            },
            (err: any) => {

            }
        );
    }
    deleteCategory(idCategory: any) {
        const categoriesDelete = {
            id: idCategory
        };
        Swal.fire({
            title: '¿Estas Seguro de elimnar la categoría?',
            text: 'No se podra revertir esto!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this.createCategory.deleteCategory(categoriesDelete).subscribe(
                    res => {
                        this.getListCategory('');
                    },
                    err => {
                    }
                );
                Swal.fire(
                    'Eliminado!',
                    'La categoría ha sido eliminada.',
                    'success'
                );
            }
        });
    }
}
