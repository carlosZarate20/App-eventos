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
import { LoginService } from 'src/app/modules/event/services/login.service';
import { AdminBannerComponent } from './admin-banner.component';

const routes: Routes = [
  { path: '', component: AdminBannerComponent },
];

@NgModule({
    declarations: [
        AdminBannerComponent
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
        AccordionModule
    ],
    providers: [AdminEventService, LoginService],
    bootstrap: [AdminBannerComponent],
    exports: [AdminBannerComponent]
})
export class AdminBannerModule {
}
