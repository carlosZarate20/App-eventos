import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {CalendarModule} from 'primeng/calendar';
import { ArchwizardModule } from 'angular-archwizard';
import { CreateCategoryComponent } from './create-category.component';

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
      ArchwizardModule
    ],
    // providers: [CreateEventService],
    bootstrap: [CreateCategoryComponent],
    exports: [CreateCategoryComponent]
  })
  export class CreateCategoryModule { }
