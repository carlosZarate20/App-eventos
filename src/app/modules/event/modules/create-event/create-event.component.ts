import { Component, OnInit } from '@angular/core';
import { NullTemplateVisitor } from '@angular/compiler';
import { HttpClient } from 'selenium-webdriver/http';
import { userModel, ticketModel } from '../../Model/User';
import { CreateEventService } from '../../services/createEvent.service';
import { FormGroup, FormControl, Validators, FormBuilder, Form } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.css']
})

export class CreateEventComponent implements OnInit {
    en: any;
    selectedFiles = null;
    eventForm: FormGroup;
    url: any;
    public imagePath: any;
    public message: string;
    public listTiket: Array<ticketModel> = [];
    public model: any = {};
    constructor(public createService: CreateEventService, private fbr: FormBuilder, private router: Router){
        this.model.listCity = [];
        this.model.listCategory = [];
        this.eventForm = this.eventModelFrom();

    }
    ngOnInit() {

        this.en = {
            firstDayOfWeek: 0,
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
            monthNames: [ "January","February","March","April","May","June","July","August","September","October","November","December" ],
            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
            today: 'Today',
            clear: 'Clear',
            dateFormat: 'mm/dd/yy',
            weekHeader: 'Wk'
        };

        this.getCities();
        this.getCategory();
        this.url = '';
    }

    selectFile(event){
        this.selectedFiles = event.target.files[0];
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onload = (event: any) => {
                this.url = event.target.result;
            }

            reader.readAsDataURL(event.target.files[0]);
        }
    }
    getCities(){
        this.createService.getCities().subscribe(
            res => {
                this.model.listCity = res;
                console.log(res);
            }
        );
    }
    getCategory(){
        this.createService.getCategory().subscribe(
            res => {
                this.model.listCategory = res;
                console.log(res);
            }
        );
    }

    registerEvent(form: any){
        // let startDateHour = form.startDate + ' ' + form.startHour;
        // let endDateHour = form.endDate + ' ' + form.endHour;
        const ticketModelClass = new ticketModel();
        const datePipe = new DatePipe('en-PE');
        const startDateHour = datePipe.transform(form.startDate, 'dd/MM/yyyy h:mm:ss');
        const endDateHour = datePipe.transform(form.endDate, 'dd/MM/yyyy h:mm:ss');

        ticketModelClass.nameTicket = form.nameTicket;
        ticketModelClass.quantityAvailable = form.quantityAvailable;
        ticketModelClass.price = form.price;
        ticketModelClass.currencyType = form.currencyType;

        this.listTiket.push(ticketModelClass);
        const fd = new FormData();
        fd.append('file', this.selectedFiles, this.selectedFiles.name);
        fd.append('name', form.name);
        fd.append('description', form.description);
        fd.append('aditionalInformation', form.aditionalInformation);
        fd.append('startDate', startDateHour);
        fd.append('endDate', endDateHour);
        fd.append('adress', form.adress);
        fd.append('reference', form.reference);
        fd.append('eventCategoryId', form.eventCategoryId);
        fd.append('cityId', form.cityId);
        for ( var i = 0 ; i < this.listTiket.length; i++){
            fd.append(`TicketList[${i}].NameTicket`, this.listTiket[i].nameTicket);
            fd.append(`TicketList[${i}].QuantityAvailable`, this.listTiket[i].quantityAvailable);
            fd.append(`TicketList[${i}].Price`, this.listTiket[i].price);
            fd.append(`TicketList[${i}].CurrencyType`, this.listTiket[i].currencyType);
        }


        this.createService.registerEvent(fd).subscribe(
            res => {
                this.router.navigate(['/event/events']);
                console.log('Registro del Evento Correctamente')
            },
            err => {
                console.log('Error el en servidor del registro')
            }
        )

    }
    uploadImage(){
        const fd = new FormData();
        fd.append('file', this.selectedFiles, this.selectedFiles.name);

        this.createService.register(fd).subscribe(
            res => {
                // console.log(res);
                console.log('Subida Imagen');
            },
            (err: any) => {
                // console.log(err);
                console.log('Error en el servidor');
            }
        );
    }

    eventModelFrom(): FormGroup {
        return this.fbr.group({
            id : [null],
            name : [''],
            description: [''],
            aditionalInformation: [''],
            startDate: [''],
            startHour: [''],
            endDate: [''],
            endHour: [''],
            adress: [''], 
            reference: [''],
            nameTicket: [''],
            quantityAvailable: [0],
            price: [''],
            currencyType: [0] ,
            eventCategoryId: [0],
            cityId: [0]
        });
    }


}