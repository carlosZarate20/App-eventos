import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsHomeComponent } from './events-home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeEventService } from '../../services/homeEvent.service';
import { NgxLoadingModule } from 'ngx-loading';
const routes: Routes = [
  { path: '', component: EventsHomeComponent },
];

@NgModule({
  declarations: [
    EventsHomeComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgxLoadingModule
  ],
  providers: [HomeEventService],
  exports: [EventsHomeComponent]
})
export class EventsHomeModule { }
