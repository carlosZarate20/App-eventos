import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminEventService } from '../../services/admin.service';
import { LoginService } from 'src/app/modules/event/services/login.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
    selector: 'app-admin-bank',
    templateUrl: './admin-bank.component.html',
    styleUrls: ['./admin-bank.component.css']
})

export class AdminBankComponent implements OnInit {
    ngOnInit() {
    }
}
