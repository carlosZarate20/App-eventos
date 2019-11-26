import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminEventService } from '../../services/admin.service';
import { LoginService } from 'src/app/modules/event/services/login.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
    selector: 'app-admin-messages',
    templateUrl: './admin-messages.component.html',
    styleUrls: ['./admin-messages.component.css']
})

export class AdminMessagesComponent implements OnInit {
    ngOnInit() {
    }
}
