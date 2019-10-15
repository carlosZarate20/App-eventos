import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NullTemplateVisitor } from '@angular/compiler';
import { HttpClient } from 'selenium-webdriver/http';
import { userModel, ticketModel } from '../../Model/User';
import { CreateEventService } from '../../services/createEvent.service';
import { FormGroup, FormControl, Validators, FormBuilder, Form } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { EventModel } from '../../Model/event';
import { UUID } from 'angular2-uuid';
import Swal from 'sweetalert2';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


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
    public model: any = {};

    public boolDetails: Boolean;
    public boolUbication: Boolean;
    public boolTickets: Boolean;
    public boolBillingInformation: Boolean;
    public boolSendEvent: Boolean;
    public wizardSteps: Array<Object>;
    public step: any;
    public contador: number = 0;
    public validFieldsAux: Boolean = false;
    public validUrlLink: Boolean;
    public validUrlLinkMessage: Boolean;
    public eventModel: EventModel = new EventModel();
    constructor(public createService: CreateEventService,
                private router: Router, private loginService: LoginService) {
        this.model.listCity = [];
        this.model.listCategory = [];
        // this.eventForm = this.eventModelFrom();
    }
    ngOnInit() {
        this.step = '1';
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
        this.validUrlLinkMessage = false;
        this.contador = 0;
        this.model.name = '';
        this.model.description = '';
        this.model.aditionalInformation = '';
        this.model.eventCategoryName = '';
        this.model.urlVideo = '';
        this.model.startDate = '';
        this.model.endDate = '';
        this.model.adress = '';
        this.model.cityName = '';
        this.model.reference = '';
        this.model.eventCategoryId = 0;
        this.model.cityId = 0;
        this.model.document = '';
        this.model.socialReason = '';
        this.model.bankNumber = '';
        this.model.bank = '';
        this.model.bankCurrencyTipe = '';
        this.model.personContact = '';
        this.model.phoneContact = '';
        this.model.emailContact = '';
        this.model.nameTicket = '';
        this.model.quantityAvailable = '';
        this.model.price = '';
        this.model.currencyType = '';
        const tikects: ticketModel[] = [];
        this.model.listTiket = tikects;
        this.model.contador = 0;
    }

    ngAfterViewInit() {

    }
    selectFile(event) {
        this.selectedFiles = event.target.files[0];
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onload = (event: any) => {
                this.url = event.target.result;
            };
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
    getCities() {
        this.createService.getCities().subscribe(
            res => {
                this.model.listCity = res;
                console.log(res);
            }
        );
    }
    getCategory() {
        this.createService.getCategory().subscribe(
            res => {
                this.model.listCategory = res;
                console.log(res);
            }
        );
    }

    registerEvent() {
        const datePipe = new DatePipe('en-PE');
        // const startDateHour = datePipe.transform(form.startDate, 'dd/MM/yyyy h:mm:ss');
        // const endDateHour = datePipe.transform(form.endDate, 'dd/MM/yyyy h:mm:ss');

        const startDateHour = datePipe.transform(this.model.startDate, 'dd/MM/yyyy h:mm a');
        const endDateHour = datePipe.transform(this.model.endDate, 'dd/MM/yyyy h:mm a');
        const fd = new FormData();
        fd.append('file', this.selectedFiles, this.selectedFiles.name);
        fd.append('fileImageLocalization', this.selectedFiles2, this.selectedFiles2.name);
        fd.append('name', this.model.name);
        fd.append('description', this.model.description);
        fd.append('aditionalInformation', this.model.aditionalInformation);
        fd.append('startDate', startDateHour);
        fd.append('endDate', endDateHour);
        fd.append('adress', this.model.adress);
        fd.append('reference', this.model.reference);
        fd.append('eventCategoryId', this.model.eventCategoryId);
        fd.append('cityId', this.model.cityId);
        fd.append('urlVideo', this.model.urlVideo);
        fd.append('document', this.model.document);
        fd.append('socialReason', this.model.socialReason);
        fd.append('bankNumber', this.model.bankNumber);
        fd.append('bank', this.model.bank);
        fd.append('bankCurrencyTipe', this.model.bankCurrencyTipe);
        fd.append('personContact', this.model.personalContact);
        fd.append('phoneContact', this.model.phoneContact);
        fd.append('emailContact', this.model.emailContact);

        const tokenAcces = this.loginService.getDecodedAccessToken();
        fd.append('UserId', tokenAcces.Id);

        for ( let i = 0 ; i < this.model.listTiket.length; i++) {
            fd.append(`TicketList[${i}].NameTicket`, this.model.listTiket[i].nameTicket);
            fd.append(`TicketList[${i}].QuantityAvailable`, this.model.listTiket[i].quantityAvailable);
            fd.append(`TicketList[${i}].Price`, this.model.listTiket[i].price);
            fd.append(`TicketList[${i}].CurrencyType`, this.model.listTiket[i].currencyType);
        }


        this.createService.registerEvent(fd).subscribe(
            res => {
                let timerInterval;
                Swal.fire({
                title: 'Evento registrado correctamente',
                html: 'Se le redireccionara en <strong></strong> milisegundos.',
                type: 'success',
                timer: 2000,
                onBeforeOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                    Swal.getContent().querySelector('strong').textContent = Swal.getTimerLeft().toString();
                    }, 100)
                },
                onClose: () => {
                    clearInterval(timerInterval);

                }
                }).then((result) => {
                if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.timer
                ) {
                    this.router.navigate(['/event/events']);
                    console.log('Registro del Evento Correctamente');
                }
                });

            },
            err => {
                console.log('Error el en servidor del registro');
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

    // eventModelFrom(): FormGroup {
    //     return this.fbr.group({
    //         id : [null],
    //         name : ['', Validators.compose([Validators.required])],
    //         description: ['', Validators.compose([Validators.required])],
    //         aditionalInformation: ['', Validators.compose([Validators.required])],
    //         startDate: ['', Validators.compose([Validators.required])],
    //         endDate: ['', Validators.compose([Validators.required])],
    //         adress: ['', Validators.compose([Validators.required])],
    //         reference: ['', Validators.compose([Validators.required])],
    //         nameTicket: ['', Validators.compose([Validators.required])],
    //         quantityAvailable: [0, Validators.compose([Validators.required])],
    //         price: ['', Validators.compose([Validators.required])],
    //         currencyType: [0, Validators.compose([Validators.required])],
    //         eventCategoryId: [0, Validators.compose([Validators.required])],
    //         cityId: [0, Validators.compose([Validators.required])],
    //         urlVideo: ['', Validators.compose([Validators.required])],
    //         document: ['', Validators.compose([Validators.required])],
    //         socialReason: ['', Validators.compose([Validators.required])],
    //         bankNumber: ['', Validators.compose([Validators.required])],
    //         bank: ['', Validators.compose([Validators.required])],
    //         bankCurrencyTipe: [0, Validators.compose([Validators.required])],
    //         personalContact: ['', Validators.compose([Validators.required])],
    //         phoneContact: ['', Validators.compose([Validators.required])],
    //         emailContact: ['', Validators.compose([Validators.required])]
    //     });
    // }
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

    validateURLCorrect(data: string) {
        // tslint:disable-next-line:max-line-length
        // const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)|(HTTP:\/\/WWW\.|HTTPS:\/\/WWW\.|HTTP:\/\/|HTTPS:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        // tslint:disable-next-line:max-line-length
        const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        if (!pattern.test(data.toLowerCase())) {
            this.validFieldsAux = true;
        } else {
            this.validFieldsAux = false;
        }
    }

    validateURLVideo(){
        this.validUrlLink = false;
        if (this.model.urlVideo != '' && this.model.urlVideo.length > 0) {
            this.validateURLCorrect(this.model.urlVideo);
            this.validUrlLink = this.validFieldsAux;
            if (this.validFieldsAux) {
                this.validUrlLinkMessage = true;
            } else {
                this.validUrlLinkMessage = false;
            }
        } else {
            this.validUrlLinkMessage = false;
        }
    }

    addTikects() {
        if ( this.model.price != '' && this.model.quantityAvailable != '' && this.model.nameTicket != '') {
            if ( this.model.listTiket.length < 10) {
                const key = UUID.UUID();
                const tikect = new ticketModel();
                tikect.price = this.model.price;
                tikect.currencyType = this.model.currencyType;
                tikect.nameTicket = this.model.nameTicket;
                tikect.quantityAvailable = this.model.quantityAvailable;
                tikect.codeTmp = key;
                this.model.listTiket.push(tikect);
                console.log(this.model.listTiket);
                this.model.price = '';
                this.model.quantityAvailable = '';
                this.model.nameTicket = '';
                this.model.contador++;
            } else {
                Swal.fire('Solo se pueden agregar como máximo 10 entradas', this.message, 'info');
            }
        } else {
            Swal.fire('Los campos no pueden estar vacíos', this.message, 'info');
        }
    }

    deleteTickets(tikectValue: string) {
        Swal.fire({
            title: '¿Estas Seguro?',
            text: 'No se podra revertir esto!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                const indice = this.model.listTiket.findIndex(x => {
                        return x.codeTmp == tikectValue;
                    });
                this.model.listTiket.splice(indice, 1);
                console.log(this.model.listTiket);
                this.model.contador--;
                Swal.fire(
                    'Eliminado!',
                    'La entrada ha sido eliminada.',
                    'success'
                );
            }
        });
    }
}
