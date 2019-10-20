import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {CalendarModule} from 'primeng/calendar';
import { CreateEventService } from '../event/services/createEvent.service';
import { ArchwizardModule } from 'angular-archwizard';
import { AdminComponent } from './admin.component';
import { JwtInterceptor } from 'src/app/Helpers/jwt.interceptor';
import { LoginService } from '../event/services/login.service';
import { AuthGuardService } from 'src/app/Helpers/auth-guard.service';
import { ConstantHelper } from 'src/app/Helpers/ConstantsHelpers';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {
    path: 'create',
    component: AdminComponent,
    loadChildren: './modules/create-category/create-category.module#CreateCategoryModule',
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
    declarations: [
        AdminComponent
    ],
    imports: [
      RouterModule.forChild(routes),
      CommonModule,
      HttpClientModule,
      FormsModule,
      CalendarModule,
      ReactiveFormsModule,
      ArchwizardModule
    ],
    providers: [
      LoginService,
      AuthGuardService,
      ConstantHelper,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
      }
    ],
    bootstrap: [AdminComponent],
    exports: [AdminComponent]
  })
  export class AdminModule { }
