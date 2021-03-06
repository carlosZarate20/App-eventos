import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginService } from '../../services/login.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
// import { NgxLoadingModule } from 'ngx-loading';
import { NgxLoadingModule } from '../../../../../../node_modules/ngx-loading';

const routes: Routes = [
  { path: '', component: LoginComponent },
];

@NgModule({
    declarations: [
      LoginComponent
    ],
    imports: [
      RouterModule.forChild(routes),
      CommonModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      ConfirmDialogModule,
      DialogModule,
      NgxLoadingModule.forRoot({})
    ],
    providers: [LoginService],
    bootstrap: [LoginComponent],
    exports: [LoginComponent]
  })
  export class LoginModule { }
