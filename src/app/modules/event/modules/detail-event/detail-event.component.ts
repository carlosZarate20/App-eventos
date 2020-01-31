import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DetailsEventService } from '../../services/detailsEvent.service';
import { EventModel } from '../../Model/event';
import { LoginService } from '../../services/login.service';
import { seatModel } from '../../Model/seat';
import Swal from 'sweetalert2';
declare var $: any;
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
    public quantity: any = {};
    public ticketPrice: any = 0;
    public valueTicketPrice: any = 0;
    public valueTicketPriceTotal: any = 0;
    public message: string;
    public eventModel: EventModel = new EventModel();
    public loading = false;
    public valueNegative = false;
    constructor(public route: ActivatedRoute, public detailEventService: DetailsEventService, private loginService: LoginService) {
        this.model.listEvent = [];
        this.model.listTicketSeat = [];
        const seat: seatModel[] = [];
        this.model.seatTiket = seat;
        this.model.typeSeat = '';
        this.quantity = [];
    }
    ngOnInit() {
        this.model.quantity = '';
        this.model.seatId = '';
        this.value = this.route.snapshot.paramMap.get('id');
        console.log('Valor ' + this.value);
        this.getDetailsEvents(this.value);
    }
    getListSeatEvent(ticketId: any, ticketPrice: any) {
        this.loading = true;
        console.log(ticketPrice);
        const tokenAcces = this.loginService.getDecodedAccessToken();
        if (tokenAcces == null) {
            this.loading = false;
            Swal.fire('Necesita iniciar sesión para comprar las entradas', this.message, 'info');
        } else {
            this.ticketPrice = ticketPrice;
            $('#myModal').modal('show');
            this.detailEventService.getListSeat(ticketId).subscribe(
                (res: any) => {
                    this.loading = false;
                    this.model.listTicketSeat = res;
                    // this.model.seatId = this.model.listTicketSeat.id;

                    // for (let i = 0; i < this.model.listTicketSeat.length; i++) {
                    //     if (this.model.listTicketSeatRow.length == 0){
                    //         if (this.model.listTicketSeat[i].type == 2) {
                    //             const seatRow = new seatModelRow();
                    //             seatRow.id = this.model.listTicketSeat[i].id;
                    //             seatRow.name = this.model.listTicketSeat[i].name;
                    //             seatRow.quantity = this.model.listTicketSeat[i].quantity;
                    //             seatRow.type = this.model.listTicketSeat[i].type;
                    //             this.model.listTicketSeatRow.push(seatRow);
                    //         }
                    //     }
                    //     if (this.model.listTicketSeatTable.length == 0) {
                    //         if (this.model.listTicketSeat[i].type == 1) {
                    //             const seatTable = new seatModelTable();
                    //             seatTable.id = this.model.listTicketSeat[i].id;
                    //             seatTable.name = this.model.listTicketSeat[i].name;
                    //             seatTable.quantity = this.model.listTicketSeat[i].quantity;
                    //             seatTable.type = this.model.listTicketSeat[i].type;
                    //             this.model.listTicketSeatTable.push(seatTable);
                    //         }
                    //     }
                    // }
                    console.log(res);
                },
                (err: any) => {
                }
            );
        }
    }
    getDetailsEvents(id: string) {
        this.detailEventService.getDetailsEvent(id).subscribe(
            (res: any) => {
                this.eventModel.name = res.name;
                this.eventModel.description = res.description;
                this.eventModel.aditionalInformation = res.aditionalInformation;
                this.eventModel.file = 'http://edumoreno27-001-site6.etempurl.com' + res.image;
                this.eventModel.startDate = res.startDate;
                this.eventModel.adress = res.adress;
                this.eventModel.cityName = res.cityName;
                this.eventModel.eventCategoryName = res.eventCategoryName;
                this.eventModel.fileImageLocalization = 'http://edumoreno27-001-site6.etempurl.com' + res.imageLocalization;
                this.model.listEvent = res.ticketList;
                console.log(res);
            },
            err => {

            }
        );
    }
    saveLListTicket(seatId: any, iValue: any) {
        this.quantity = iValue;
        const quantitySearch =  this.quantity;
        const tokenAcces = this.loginService.getDecodedAccessToken();
        let valueIdList = false;
        setTimeout(() => {
            if (quantitySearch != '' ) {
                if (quantitySearch == this.quantity) {
                    if (this.quantity) {
                        if (this.model.seatTiket.length > 0) {
                            console.log('Antes ', this.model.seatTiket);
                            const listAux = this.model.seatTiket.filter( x => x.seatId == seatId);
                            console.log('Durante ', listAux);
                            for (let i = 0; i < listAux.length; i++) {
                                listAux[i].quantity = this.quantity;
                                valueIdList = true;
                                console.log('Despues ', this.model.seatTiket);
                            }

                            // for (let i = 0; i < this.model.seatTiket.length; i++) {
                            //     if (this.model.seatTiket[i].seatId == seatId) {
                            //         this.model.seatTiket[i].quantity = this.quantity;
                            //         valueIdList = true;
                            //     }
                            // }
                            if (valueIdList == false) {
                                const seatTikect = new seatModel();
                                seatTikect.userId = tokenAcces.Id;
                                seatTikect.seatId = seatId;
                                seatTikect.quantity = this.quantity;
                                this.model.seatTiket.push(seatTikect);
                                console.log(this.model.seatTiket);
                            }
                        } else {
                            const seatTikect = new seatModel();
                            seatTikect.userId = tokenAcces.Id;
                            seatTikect.seatId = seatId;
                            seatTikect.quantity = this.quantity;
                            this.model.seatTiket.push(seatTikect);
                            console.log(this.model.seatTiket);
                        }
                    }
                    this.getValueTotal();
                }
            } else {

                const indice = this.model.seatTiket.findIndex(x => {
                    return x.seatId == seatId;
                });
                this.model.seatTiket.splice(indice, 1);
                console.log(this.model.seatTiket);
                this.valueTicketPrice = 0;
                this.getValueTotal();
            }
        }, 1000);
    }
    getValueTotal() {
        this.valueTicketPriceTotal = 0;
        let valueTicketQuantity = 0;
        for (let i = 0; i < this.model.seatTiket.length; i++) {
            valueTicketQuantity = valueTicketQuantity + parseInt(this.model.seatTiket[i].quantity);
        }
        this.valueTicketPriceTotal = this.ticketPrice * valueTicketQuantity;
    }
    saveTickectSeat() {
        this.loading = true;
        const fd = new FormData();
        console.log(this.model.seatTiket.length);
        if (this.model.seatTiket.length != 0) {
            for ( let i = 0 ; i < this.model.seatTiket.length; i++) {
                fd.append(`UserSeatList[${i}].UserId`, this.model.seatTiket[i].userId);
                fd.append(`UserSeatList[${i}].SeatId`, this.model.seatTiket[i].seatId);
                fd.append(`UserSeatList[${i}].Quantity`, this.model.seatTiket[i].quantity);
                if (this.model.seatTiket[i].quantity <= 0) {
                    this.valueNegative = true;
                }
            }
            if (this.valueNegative == true) {
                Swal.fire('Algunos valores son números negativos o ceros', this.message, 'info');
            } else {
                this.detailEventService.saveTickectSeat(fd).subscribe(
                    (res: any) => {
                        this.loading = false;
                        this.quantity = '';
                        $('#myModal').modal('hide');
                        this.getDetailsEvents(this.value);
                        Swal.fire(
                            'Comprado!',
                            'Se realizó la compra correctamente.',
                            'success'
                        );
                    },
                    (err: any) => {
                        this.loading = false;
                        this.message = err.error;
                        Swal.fire('Oops...', this.message, 'error');
                    }
                );
            }
        } else {
            this.loading = false;
            this.message = 'Ingresa la cantidad de entradas a comprar';
            Swal.fire('Oops...', this.message, 'error');
        }
    }
}
