import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { ArchwizardModule } from 'angular-archwizard';
import { AdminEventService } from '../../services/admin.service';
import { PaginatorModule } from 'primeng/paginator';
import { AccordionModule } from 'primeng/accordion';
import { AdminMessagesComponent } from './admin-messages.component';
import { LoginService } from 'src/app/modules/event/services/login.service';

const routes: Routes = [
    { path: '', component: AdminMessagesComponent },
];

@NgModule({
    declarations: [
        AdminMessagesComponent
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
    bootstrap: [AdminMessagesComponent],
    exports: [AdminMessagesComponent]
})
export class AdminMessagesModule {}
