import { Component, OnInit } from '@angular/core';
import { RegisterUserService} from '../../services/registerUser.service';
import { userModel } from '../../Model/User';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../../Model/CustomValidators';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    public model: any = {};
    userForm: FormGroup;
    submitted = false;
    constructor( public registerService: RegisterUserService, private fb: FormBuilder, private router: Router) {
        this.userForm = this.createForm();
    }
    ngOnInit() {
    }

    registerUser(form: any) {
        this.submitted = true;
        if (this.userForm.invalid) {
            return;
        } else {
            this.registerService.register(form).subscribe(
                res => {
                    this.router.navigate(['/event/login']);
                },
                (err: any) => {
                    console.log('Registro Erroneo');
                }
            );
        }
    }

    createForm(): FormGroup {
        return this.fb.group({
            id : [null],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            emailConfirm: ['', Validators.compose([Validators.required, Validators.maxLength(40)])],
            password: ['', Validators.compose([Validators.required,
                Validators.minLength(6),
                CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
                CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true })])],
            passwordConfirm: ['', Validators.compose([Validators.required])],
            name: ['', Validators.compose([Validators.required,
                CustomValidators.patternValidator(/^[A-Za-z](?!.*?\s$)[A-Za-z\s]{0,55}$/, { isvalid: true })])],
            lastName: ['', Validators.compose([Validators.required,
                CustomValidators.patternValidator(/^[A-Za-z](?!.*?\s$)[A-Za-z\s]{0,55}$/, { isvalid: true })])],
            phone: ['', Validators.compose([Validators.required,
                Validators.minLength(7), Validators.maxLength(9), Validators.pattern('[0-9]*')])]
        }, {validator: [CustomValidators.passwordMatchValidator]});
    }
}
