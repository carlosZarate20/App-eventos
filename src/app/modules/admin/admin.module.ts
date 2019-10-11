import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {CalendarModule} from 'primeng/calendar';
import { CreateEventService } from '../event/services/createEvent.service';
import { ArchwizardModule } from 'angular-archwizard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
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
    bootstrap: [AdminComponent],
    exports: [AdminComponent]
  })
  export class AdminModule { }
