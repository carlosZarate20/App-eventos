import { Component, OnInit } from '@angular/core';
import { RegisterUserService} from '../../services/registerUser.service'
import { userModel } from '../../Model/User'
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    public model: any = {};
    userForm: FormGroup;
    constructor( public registerService: RegisterUserService, private fb: FormBuilder){
        this.userForm = this.createForm();
    }
    ngOnInit() {
        
    }

    registerUser(form: any){
        if (form.invalid) {
            return;
        }else{
            this.registerService.register(form).subscribe(
                res => {
                    console.log(res)
                },
                (err: any) => {
                    console.log(err)
                }
            );
        }
    }
    getValues(){
        this.registerService.getValues().subscribe(
            (res: any) => {
                console.log(res)
            }
        )
    }
    
    createForm(): FormGroup{
        return this.fb.group({
            id : [null],
            email: [''],
            emailConfirm: [''],
            password: [''],
            passwordConfirm: [''],
            name: [''],
            lastName: [''],
            phone: ['']
        });
    }
}