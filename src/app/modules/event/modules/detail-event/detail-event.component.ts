import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DetailsEventService } from '../../services/detailsEvent.service';
import { EventModel } from '../../Model/event';


@Component({
    selector: 'app-detail-event',
    templateUrl: './detail-event.component.html',
    styleUrls: ['./detail-event.component.css'],
    providers: []
})

export class DetailEventComponent implements OnInit {

    public value: any;
    public model: any = {};
    public name: any;
    public eventModel: EventModel = new EventModel();
    constructor(public route: ActivatedRoute, public detailEventService: DetailsEventService) {
        this.model.listEvent = [];
    }
    ngOnInit() {
        this.value = this.route.snapshot.paramMap.get('id');
        console.log(this.value);
        this.getDetailsEvents(this.value);
    }

    getDetailsEvents(id: string) {
        this.detailEventService.getDetailsEvent(id).subscribe(
            (res: any) => {
                this.eventModel.name = res.name;
                this.eventModel.description = res.description;
                this.eventModel.aditionalInformation = res.aditionalInformation;
                this.eventModel.image = 'http://edumoreno27-001-site6.etempurl.com' + res.image;
                this.eventModel.startDate = res.startDate;
                this.eventModel.adress = res.adress;
                this.eventModel.cityName = res.cityName;
                this.eventModel.eventCategoryName = res.eventCategoryName;
                this.eventModel.imageLocalization = 'http://edumoreno27-001-site6.etempurl.com' + res.imageLocalization;
                console.log(res);
            },
            err => {

            }
        );
    }
}
