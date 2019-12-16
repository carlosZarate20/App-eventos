import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { ArchwizardModule } from 'angular-archwizard';
import { AdminEventService } from '../../services/admin.service';
import { PaginatorModule } from 'primeng/paginator';
import { AccordionModule } from 'primeng/accordion';
import { AdminBankComponent } from './admin-bank.component';
import { LoginService } from 'src/app/modules/event/services/login.service';
import { NgxLoadingModule } from 'ngx-loading';

const routes: Routes = [
  { path: '', component: AdminBankComponent },
];

@NgModule({
    declarations: [
        AdminBankComponent
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
    bootstrap: [AdminBankComponent],
    exports: [AdminBankComponent]
})
export class AdminBankModule {
}
