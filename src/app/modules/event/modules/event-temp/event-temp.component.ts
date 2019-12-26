import { Component, OnInit } from '@angular/core';
import { RegisterUserService} from '../../services/registerUser.service';
import { userModel } from '../../Model/User';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../../Model/CustomValidators';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';
import { EventTempService } from '../../services/eventTemp.service';

@Component({
    selector: 'app-event-temp',
    templateUrl: './event-temp.component.html',
    styleUrls: ['./event-temp.component.css']
})

export class EventTempComponent implements OnInit {

    public model: any = {};
    public valueToken: any;
    constructor(private loginService: LoginService, public eventTempService: EventTempService) {
        this.model.listEvent = [];
        this.getListEventBuy();
    }


    ngOnInit() {
    }

    getListEventBuy() {
        const tokenAcces = this.loginService.getDecodedAccessToken();
        this.valueToken = tokenAcces.Id;
        console.log('Token ' + this.valueToken);
        this.eventTempService.getListEventsBuy(this.valueToken).subscribe(
            res => {
                this.model.listEvent = res;
                console.log(this.model.listEvent);
            }
        );
    }
}
