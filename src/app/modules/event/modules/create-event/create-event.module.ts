import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventComponent } from './create-event.component';
import {CalendarModule} from 'primeng/calendar';

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
      CalendarModule
    ],
    bootstrap:[CreateEventComponent], 
    exports: [CreateEventComponent]
  })
  export class CreateEventModule { }
  