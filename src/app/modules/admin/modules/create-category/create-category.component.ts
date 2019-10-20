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
    constructor(private createCategory: AdminEventService, public loginService: LoginService) {
        this.model.listCategory = [];
    }

    ngOnInit() {
        this.getListCategory();
        this.model.nameCategory = '';
    }

    getListCategory(){
        this.createCategory.getCategory().subscribe(
            res =>{
                this.model.listCategory = res;
                console.log(this.model.listCategory);
            }
        );
    }
    saveCategory() {
        const tokenAcces = this.loginService.getDecodedAccessToken();

        const categories = {
            userId: tokenAcces.Id,
            name: this.model.nameCategory
        }
        this.createCategory.createCategory(categories).subscribe(
            (res: any) => {
                this.getListCategory();
                console.log('registrado');
                
            },
            (err: any) => {
                $("#myModal").modal("hide");
                this.model.nameCategory = '';
                this.getListCategory();
                
                console.log('No registrado');
            }
        );
    }

    updateCategory(){
        
    }
    deleteCategory(idCategory: any){
        const categories = {
            id: idCategory
        }
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
                this.createCategory.deleteCategory(categories).subscribe(
                    res => {
                        this.getListCategory();
                        console.log("Ha sido eliminado");
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
