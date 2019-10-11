import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Constants } from '../shared/util/constants';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService]
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    public displayDialogAlert: Boolean = false;
    public titularAlerta: string = '';
    public message: any = '';
    public role: any = [];
    constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) {
        this.loginForm = this.loginValidateForm();
    }
    ngOnInit() {
    }

    loginUser(form: any) {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        } else {
            this.loginService.login(form).subscribe(
                (res: any) => {
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('tokenExpiration', res.expiration);
                    const values = this.loginService.getDecodedAccessToken();
                    this.role = values.Role;
                    if (this.role === Constants.ROLE_ADMIN ) {
                        this.router.navigate(['/admin']);
                    } else {
                        this.router.navigate(['/event/events']);
                    }
                },
                (err: any) => {
                    this.message = err.error;
                    Swal.fire('Oops...', this.message, 'error');
                    console.log(err.error);
                    console.log('Login Erroneo');
                    // this.displayDialogAlert = true;
                }
            );
        }
    }

    loginValidateForm(): FormGroup {
        return this.fb.group({
            id : [null],
            userName: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required])],
        });
    }

}
