import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NullTemplateVisitor } from '@angular/compiler';
import { HttpClient } from 'selenium-webdriver/http';
import { userModel, ticketModel, ticketTypeModel, ticketTableModel, ticketTypeModelList, ticketModelAux } from '../../Model/User';
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
    public validFile;
    public validTable;
    public validListSeat;
    public validListTable;
    public eventModel: EventModel = new EventModel();
    public messageError: any = '';
    constructor(public createService: CreateEventService,
                private router: Router, private loginService: LoginService) {
        this.model.listCity = [];
        this.model.listCategory = [];
        this.model.listCategoryAux = []; 
        this.model.listBank = [];
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
        this.getBank();
        this.url = '';
        this.url2 = '';
        this.boolDetails = true;
        this.boolUbication = false;
        this.boolTickets = false;
        this.boolBillingInformation = false;
        this.boolSendEvent = false;
        this.validUrlLinkMessage = false;
        this.validListSeat = false;
        this.validListTable = false;
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
        this.model.ticket = '';
        this.model.typeTicket = '';
        this.model.quantityTicketAvailable = 0;
        this.model.quantityTableAvailable = 0;
        this.model.nameTypeTicket = '';
        this.model.nameTypeTable = '';
        this.model.InBannerPost = false;
        this.model.InMainView = false;
        const tikectsAux: ticketModelAux[] = [];
        const tikects: ticketModel[] = [];
        const typeTikects: ticketTypeModel[] = [];
        const tableTickets: ticketTableModel[] = [];
        const typeTicketsList: ticketTypeModelList[] = [];
        this.model.listTiketAux = tikectsAux;
        this.model.listTiket = tikects;
        this.model.listTableTicket = tableTickets;
        this.model.contador = 0;
        this.model.numberTable = 1;
        this.model.numberRow = 1;
        this.model.contadorAuxTable = 0;
        this.model.contadorAux = 0;
        this.model.listTypeTicket = typeTikects;
        this.model.seatList = typeTicketsList;
        this.validFile = false;
        this.validTable = false;
        this.model.valueQuantity = 0;
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
                this.model.listCategoryAux = res;
                this.model.listCategory = this.model.listCategoryAux.data;
                console.log(res);
            }
        );
    }

    getBank(){
        this.createService.getBank().subscribe(
            res => {
                this.model.listBank = res;
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
        fd.append('bankId', this.model.bank);
        fd.append('bankCurrencyTipe', this.model.bankCurrencyTipe);
        fd.append('personContact', this.model.personalContact);
        fd.append('phoneContact', this.model.phoneContact);
        fd.append('emailContact', this.model.emailContact);
        fd.append('inBannerPost', this.model.InBannerPost);
        fd.append('inMainView', this.model.InMainView);

        const tokenAcces = this.loginService.getDecodedAccessToken();
        fd.append('UserId', tokenAcces.Id);

        for ( let i = 0 ; i < this.model.listTiket.length; i++) {
            fd.append(`TicketList[${i}].NameTicket`, this.model.listTiket[i].nameTicket);
            fd.append(`TicketList[${i}].QuantityAvailable`, this.model.listTiket[i].quantityAvailable);
            fd.append(`TicketList[${i}].Price`, this.model.listTiket[i].price);
            fd.append(`TicketList[${i}].CurrencyType`, this.model.listTiket[i].currencyType);
            let j = 0;
            const listAux =  this.model.seatList.filter( x => x.idCodeTicket == this.model.listTiket[i].codeTmp);
            for (j ; j < listAux.length; j++) {
                // fd.append(`TicketList[${i}].SeatList[${j}][0].Number`, listAux[j].number);
                fd.append(`TicketList[${i}].SeatList[${j}][0].Quantity`, listAux[j].quantity);
                fd.append(`TicketList[${i}].SeatList[${j}][0].Type`, listAux[j].type);
                fd.append(`TicketList[${i}].SeatList[${j}][0].Name`, listAux[j].name);
            }
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
                }
                });

            },
            err => {
                Swal.fire('Oops...', 'No se han ingresado todos los campos obligatorios', 'error');
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
                const tikectsAux = new ticketModelAux();
                tikect.price = this.model.price;
                tikect.currencyType = this.model.currencyType;
                tikect.nameTicket = this.model.nameTicket;
                tikect.quantityAvailable = this.model.quantityAvailable;
                tikect.codeTmp = key;
                this.model.listTiket.push(tikect);

                tikectsAux.price = this.model.price;
                tikectsAux.currencyType = this.model.currencyType;
                tikectsAux.nameTicket = this.model.nameTicket;
                tikectsAux.quantityAvailable = this.model.quantityAvailable;
                tikectsAux.codeTmp = key;
                this.model.listTiketAux.push(tikectsAux);

                this.validListSeat = true;
                this.validListTable = false;

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
                this.model.quantityTicketAvailable = 0;
                this.model.ticket = '';
                this.model.contador--;
                Swal.fire(
                    'Eliminado!',
                    'La entrada ha sido eliminada.',
                    'success'
                );
            }
        });
    }

    addTypeTickets() {
        if (this.model.quantityTicketAvailable != 0) {
            let valueTmp = '';
            let valueQuantity = 0;
            const key = UUID.UUID();
            const tikectType = new ticketTypeModel();
            const tikectTypeList = new ticketTypeModelList();
            for (let i = 0; i < this.model.listTiketAux.length; i++) {
                valueTmp = this.model.listTiketAux[i].codeTmp;
                if (this.model.ticket == valueTmp) {
                    valueQuantity = this.model.listTiketAux[i].quantityAvailable;
                    // tslint:disable-next-line:radix
                    if (parseInt(this.model.quantityTicketAvailable) > valueQuantity) {
                        Swal.fire('La cantidad de entradas ingresadas supera las disponibles', this.message, 'info');
                        break;
                    } else {
                        tikectType.codeTicket= this.model.listTiketAux[i].nameTicket;
                        tikectType.nameTypeTicket = 'Fila';
                        tikectType.quantity = this.model.quantityTicketAvailable;
                        tikectType.codeTmp = key;
                        tikectType.number =  this.model.numberRow;
                        tikectType.name = this.model.nameTypeTicket;
                        this.model.listTiketAux[i].quantityAvailable = this.model.listTiketAux[i].quantityAvailable - tikectType.quantity;
                        this.model.listTypeTicket.push(tikectType);

                        tikectTypeList.codeTicket= this.model.listTiketAux[i].nameTicket;
                        tikectTypeList.type = this.model.typeTicket;
                        tikectTypeList.quantity = this.model.quantityTicketAvailable;
                        tikectTypeList.codeTmp = key;
                        tikectTypeList.idCodeTicket = this.model.ticket;
                        tikectTypeList.number =  this.model.numberRow;
                        tikectTypeList.name = this.model.nameTypeTicket;
                        this.model.seatList.push(tikectTypeList);

                        this.validListSeat = true;
                        this.validListTable = false;  
                        this.model.quantityTicketAvailable = 0;
                        this.model.nameTypeTicket = '';
                        this.model.numberRow++;
                        this.model.contadorAux++;
                        this.checkTypeTicketList();
                        break;
                    }
                }
            }
        } else {
            Swal.fire('Los campos no pueden estar vacíos', this.message, 'info');
        }
    }
    addTableTickets() {
        if (this.model.quantityTableAvailable != 0) {
            let valueTmp = '';
            let valueQuantity = 0;
            const key = UUID.UUID();
            const tableType = new ticketTypeModel();
            const tikectTypeList = new ticketTypeModelList();
            for (let i = 0; i < this.model.listTiketAux.length; i++) {
                valueTmp = this.model.listTiketAux[i].codeTmp;
                if (this.model.ticket == valueTmp) {
                    valueQuantity = this.model.listTiketAux[i].quantityAvailable;
                    // tslint:disable-next-line:radix
                    if (parseInt(this.model.quantityTableAvailable) > valueQuantity) {
                        Swal.fire('La cantidad de entradas ingresadas supera las disponibles', this.message, 'info');
                        break;
                    } else {
                        tableType.codeTicket = this.model.listTiketAux[i].nameTicket;
                        tableType.nameTypeTicket = 'Mesa';
                        tableType.quantity = this.model.quantityTableAvailable;
                        tableType.codeTmp = key;
                        tableType.number = this.model.numberTable;
                        tableType.name = this.model.nameTypeTable;
                        this.model.listTiketAux[i].quantityAvailable = this.model.listTiketAux[i].quantityAvailable  - tableType.quantity;
                        this.model.listTableTicket.push(tableType);

                        tikectTypeList.codeTicket= this.model.listTiketAux[i].nameTicket;
                        tikectTypeList.type = this.model.typeTicket;
                        tikectTypeList.quantity = this.model.quantityTableAvailable;
                        tikectTypeList.codeTmp = key;
                        tikectTypeList.idCodeTicket = this.model.ticket;
                        tikectTypeList.number =  this.model.numberRow;
                        tikectTypeList.name = this.model.nameTypeTable;
                        this.model.seatList.push(tikectTypeList);
                        this.validListSeat = false;
                        this.validListTable = true;
                        this.model.quantityTableAvailable = 0;
                        this.model.nameTypeTable = '';
                        this.model.numberTable++;
                        this.model.contadorAuxTable++;
                        this.checkTypeTicketList();
                        break;
                    }
                }
            }
        } else {
            Swal.fire('Los campos no pueden estar vacíos', this.message, 'info');
        }
    }
    updateTypeTickets() {

    }

    checkTypeTicket() {
        if (this.model.typeTicket == 1) {
            this.validFile = false;
            this.validTable = true;
            this.validListTable = true;
            this.validListSeat = false;

        } else {
            this.validFile = true;
            this.validTable = false;
            this.validListSeat = true;
            this.validListTable = false;
        }
    }
    checkTypeTicketList() {
        this.model.valueQuantity = 0;
        console.log(this.model.ticket);
        for (let i = 0; i < this.model.listTiketAux.length; i++) {
            if (this.model.ticket == this.model.listTiketAux[i].codeTmp) {
                this.model.valueQuantity = this.model.listTiketAux[i].quantityAvailable;
            }
        }
        // this.model.valueQuantity  = this.model.listTiket.findIndex(x => { return x.codeTmp == this.model.ticket})
    }
}
