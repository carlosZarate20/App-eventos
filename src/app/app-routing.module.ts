import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './modules/event/event.component';
import { EventsHomeComponent } from './modules/event/modules/events-home/events-home.component';
import { DetailEventComponent } from './modules/event/modules/detail-event/detail-event.component';
import { AdminComponent } from './modules/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/event/events', pathMatch: 'full' },

  { path: 'event',
    loadChildren: './modules/event/event.module#EventModule',
    canActivate: []
  },
  {
    path: 'admin',
    loadChildren: './modules/admin/admin.module#AdminModule',
    canActivate: []
  }
  // {
  //   path: 'event',
  //   component: EventComponent
  // },
  // {
  //   path: 'tuAsiento',
  //   loadChildren: './modules/event/event.module#EventModule',
  //   canActivate: []
  // },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
