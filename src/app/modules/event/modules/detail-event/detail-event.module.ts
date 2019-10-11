import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DetailEventComponent } from './detail-event.component';
import { DetailsEventService } from '../../services/detailsEvent.service';

const routes: Routes = [
  { path: '', component: DetailEventComponent },
];

@NgModule({
    declarations: [
      DetailEventComponent
    ],
    imports: [
      RouterModule.forChild(routes),
      CommonModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      ConfirmDialogModule,
      DialogModule
    ],
    providers: [DetailsEventService],
    bootstrap:[DetailEventComponent], 
    exports: [DetailEventComponent]
  })
  export class DetailEventModule { }
  