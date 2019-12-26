import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {CalendarModule} from 'primeng/calendar';
import { ArchwizardModule } from 'angular-archwizard';
import { LoginService } from 'src/app/modules/event/services/login.service';
import {PaginatorModule} from 'primeng/paginator';
import {AccordionModule} from 'primeng/accordion';
import { NgxLoadingModule } from 'ngx-loading';
import { EventTempService } from '../../services/eventTemp.service';
import { EventTempComponent } from './event-temp.component';

const routes: Routes = [
  { path: '', component: EventTempComponent },
];

@NgModule({
    declarations: [
        EventTempComponent
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
    providers: [EventTempService, LoginService],
    bootstrap: [EventTempComponent],
    exports: [EventTempComponent]
  })
  export class EventTempModule { }
