import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NullTemplateVisitor } from '@angular/compiler';
import { HttpClient } from 'selenium-webdriver/http';
import { userModel, ticketModel } from '../../Model/User';
import { CreateEventService } from '../../services/createEvent.service';
import { FormGroup, FormControl, Validators, FormBuilder, Form } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';


@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.css']
})

export class CreateEventComponent implements OnInit, AfterViewInit {
    
    en: any;
    selectedFiles = null;
    selectedFiles2 = null;
    eventForm: FormGroup;
    url: any;
    url2: any;
    public imagePath: any;
    public message: string;
    public listTiket: Array<ticketModel> = [];
    public model: any = {};

    public boolDetails: Boolean;
    public boolUbication: Boolean;
    public boolTickets: Boolean;
    public boolBillingInformation: Boolean;
    public boolSendEvent: Boolean;
    public wizardSteps: Array<Object>;
    public step: any;
    public contador: number = 0;
    constructor(public createService: CreateEventService, private fbr: FormBuilder,
                private router: Router, private loginService: LoginService) {
        this.model.listCity = [];
        this.model.listCategory = [];
        this.model.listTiket = [];
        this.model.listTiket2 = [];
        this.eventForm = this.eventModelFrom();
    }
    ngOnInit() {
        this.step = '1'
        this.en = {
            firstDayOfWeek: 1,
            dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
            dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
            monthNames: [
                'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
            ],
            monthNamesShort: [
                'ene', 'feb', 'mar', 'abr', 'may', 'jun',
                'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
            ],
            today: 'Hoy',
            clear: 'Borrar',
            dateFormat: 'mm/dd/yy',
            weekHeader: 'Wk'
        };

        this.getCities();
        this.getCategory();
        this.url = '';
        this.url2 = '';
        this.boolDetails = true;
        this.boolUbication = false;
        this.boolTickets = false;
        this.boolBillingInformation = false;
        this.boolSendEvent = false;
        this.contador = 0;
    }

    ngAfterViewInit() {

    }
    selectFile(event) {
        this.selectedFiles = event.target.files[0];
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onload = (event: any) => {
                this.url = event.target.result;
            }

            reader.readAsDataURL(event.target.files[0]);
        }
    }
    selectFile2(event) {
        this.selectedFiles2 = event.target.files[0];
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onload = (event: any) => {
                this.url2 = event.target.result;
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
        // const startDateHour = datePipe.transform(form.startDate, 'dd/MM/yyyy h:mm:ss');
        // const endDateHour = datePipe.transform(form.endDate, 'dd/MM/yyyy h:mm:ss');

        const startDateHour = datePipe.transform(form.startDate, 'dd/MM/yyyy h:mm a');
        const endDateHour = datePipe.transform(form.endDate, 'dd/MM/yyyy h:mm a');

        ticketModelClass.nameTicket = form.nameTicket;
        ticketModelClass.quantityAvailable = form.quantityAvailable;
        ticketModelClass.price = form.price;
        ticketModelClass.currencyType = form.currencyType;

        this.listTiket.push(ticketModelClass);
        const fd = new FormData();
        fd.append('file', this.selectedFiles, this.selectedFiles.name);
        fd.append('fileImageLocalization', this.selectedFiles2, this.selectedFiles2.name);
        fd.append('name', form.name);
        fd.append('description', form.description);
        fd.append('aditionalInformation', form.aditionalInformation);
        fd.append('startDate', startDateHour);
        fd.append('endDate', endDateHour);
        fd.append('adress', form.adress);
        fd.append('reference', form.reference);
        fd.append('eventCategoryId', form.eventCategoryId);
        fd.append('cityId', form.cityId);
        fd.append('urlVideo', form.urlVideo);
        fd.append('document', form.document);
        fd.append('socialReason', form.socialReason);
        fd.append('bankNumber', form.bankNumber);
        fd.append('bank', form.bank);
        fd.append('bankCurrencyTipe', form.bankCurrencyTipe);
        fd.append('personContact', form.personalContact);
        fd.append('phoneContact', form.phoneContact);
        fd.append('emailContact', form.emailContact);

        const tokenAcces = this.loginService.getDecodedAccessToken(); 
        fd.append('UserId', tokenAcces.Id);

        for ( let i = 0 ; i < this.listTiket.length; i++) {
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
        );

    }
    uploadImage() {
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
            name : ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.required])],
            aditionalInformation: ['', Validators.compose([Validators.required])],
            startDate: ['', Validators.compose([Validators.required])],
            endDate: ['', Validators.compose([Validators.required])],
            adress: ['', Validators.compose([Validators.required])],
            reference: ['', Validators.compose([Validators.required])],
            nameTicket: ['', Validators.compose([Validators.required])],
            quantityAvailable: [0, Validators.compose([Validators.required])],
            price: ['', Validators.compose([Validators.required])],
            currencyType: [0, Validators.compose([Validators.required])],
            eventCategoryId: [0, Validators.compose([Validators.required])],
            cityId: [0, Validators.compose([Validators.required])],
            urlVideo: ['', Validators.compose([Validators.required])],
            document: ['', Validators.compose([Validators.required])],
            socialReason: ['', Validators.compose([Validators.required])],
            bankNumber: ['', Validators.compose([Validators.required])],
            bank: ['', Validators.compose([Validators.required])],
            bankCurrencyTipe: [0, Validators.compose([Validators.required])],
            personalContact: ['', Validators.compose([Validators.required])],
            phoneContact: ['', Validators.compose([Validators.required])],
            emailContact: ['', Validators.compose([Validators.required])]
        });
    }
    viewCreateEvents() {
        this.boolDetails = true;
        this.boolUbication = false;
        this.boolTickets = false;
        this.boolBillingInformation = false;
        this.boolSendEvent = false;
    }
    viewUbication() {
        this.boolDetails = false;
        this.boolUbication = true;
        this.boolTickets = false;
        this.boolBillingInformation = false;
        this.boolSendEvent = false;
    }
    viewTicket() {
        this.boolDetails = false;
        this.boolUbication = false;
        this.boolTickets = true;
        this.boolBillingInformation = false;
        this.boolSendEvent = false;
    }
    viewBillingInformation() {
        this.boolDetails = false;
        this.boolUbication = false;
        this.boolTickets = false;
        this.boolBillingInformation = true;
        this.boolSendEvent = false;
    }
    validateCreateEvent() {
        this.boolDetails = false;
        this.boolUbication = false;
        this.boolTickets = false;
        this.boolBillingInformation = false;
        this.boolSendEvent = true;
    }

    addTikects(){
        
        this.contador++;
        if(this.contador <=10 ) {
            this.model.listTiket2.push(this.contador);
            console.log(this.model.listTiket2);
            console.log(this.contador);
        }
        
    }

    deleteTickets(){
        this.contador--;
        this.model.listTiket2.splice(this.contador);
        console.log(this.model.listTiket2);
        console.log(this.contador);
    }
}
