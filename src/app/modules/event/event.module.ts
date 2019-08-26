// imports
import { NgModule } from '@angular/core';
import { EventComponent } from './event.component';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: EventComponent },
  {
      path: 'events',
      component: EventComponent,
      loadChildren: './modules/events-home/events-home.module#EventsHomeModule',
      canActivate: []
  },
  {
      path: 'login',
      component: EventComponent,
      loadChildren: './modules/login/login.module#LoginModule',
      canActivate: []
  },
  {
      path: 'register',
      component: EventComponent,
      loadChildren: './modules/register/register.module#RegisterModule',
      canActivate: []
  },
  {
      path: 'create',
      component: EventComponent,
      loadChildren: './modules/create-event/create-event.module#CreateEventModule',
      canActivate: []
  }
];

@NgModule({
  declarations: [
      EventComponent,
    ],
  imports: [
      RouterModule.forChild(routes),
      HttpClientModule,
      FormsModule,
      CommonModule
    ],
  providers: [],
  bootstrap: [EventComponent]
})
export class EventModule {}