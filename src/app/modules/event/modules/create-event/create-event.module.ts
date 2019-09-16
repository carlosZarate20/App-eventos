import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventComponent } from './create-event.component';
import {CalendarModule} from 'primeng/calendar';
import { CreateEventService } from '../../services/createEvent.service';
import { ArchwizardModule } from 'angular-archwizard';

const routes: Routes = [
  { path: '', component: CreateEventComponent },
];

@NgModule({
    declarations: [
      CreateEventComponent
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
    providers: [CreateEventService],
    bootstrap:[CreateEventComponent], 
    exports: [CreateEventComponent]
  })
  export class CreateEventModule { }
  