import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {CalendarModule} from 'primeng/calendar';
import { ArchwizardModule } from 'angular-archwizard';
import { CreateCategoryComponent } from './create-category.component';
import { AdminEventService } from '../../services/admin.service';
import { LoginService } from 'src/app/modules/event/services/login.service';
import {PaginatorModule} from 'primeng/paginator';
import {AccordionModule} from 'primeng/accordion';
import { NgxLoadingModule } from 'ngx-loading';

const routes: Routes = [
  { path: '', component: CreateCategoryComponent },
];

@NgModule({
    declarations: [
        CreateCategoryComponent
    ],
    imports: [
      RouterModule.forChild(routes),
      CommonModule,
      HttpClientModule,
      FormsModule,
      CalendarModule,
      ReactiveFormsModule,
      ArchwizardModule,
      PaginatorModule,
      AccordionModule,
      NgxLoadingModule
    ],
    providers: [AdminEventService, LoginService],
    bootstrap: [CreateCategoryComponent],
    exports: [CreateCategoryComponent]
  })
  export class CreateCategoryModule { }
