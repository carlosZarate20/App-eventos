import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { RegisterUserService } from '../../services/registerUser.service';
import { NgxLoadingModule } from '../../../../../../node_modules/ngx-loading';

const routes: Routes = [
  { path: '', component: RegisterComponent },
];

@NgModule({
    declarations: [
        RegisterComponent
    ],
    imports: [
      RouterModule.forChild(routes),
      CommonModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      NgxLoadingModule
    ],
    providers: [RegisterUserService],
    bootstrap: [RegisterComponent],
    exports: [RegisterComponent]
  })
  export class RegisterModule { }
