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
    public message: string;
    public eventModel: EventModel = new EventModel();
    public loading = false;
    constructor(public route: ActivatedRoute, public detailEventService: DetailsEventService, private loginService: LoginService) {
        this.model.listEvent = [];
        this.model.listTicketSeat = [];
        const seat: seatModel[] = [];
        this.model.seatTiket = seat;
        this.quantity = [];
    }
    ngOnInit() {
        this.model.quantity = '';
        this.model.seatId = '';
        this.value = this.route.snapshot.paramMap.get('id');
        console.log(this.value);
        this.getDetailsEvents(this.value);
    }
    getListSeatEvent(ticketId: any, ticketPrice: any) {
        console.log(ticketPrice);
        const tokenAcces = this.loginService.getDecodedAccessToken();
        if (tokenAcces == null) {
            Swal.fire('Necesita iniciar sesión para comprar las entradas', this.message, 'info');
        } else {
            this.ticketPrice = ticketPrice;
            $('#myModal').modal('show');
            this.detailEventService.getListSeat(ticketId).subscribe(
                (res: any) => {
                    this.model.listTicketSeat = res;
                    this.model.seatId = this.model.listTicketSeat.id;
                    console.log(this.model.seatId);
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
    saveLListTicket(seatId: any) {
        const quantitySearch =  this.quantity;
        const tokenAcces = this.loginService.getDecodedAccessToken();
        let valueIdList = false;
        setTimeout(() => {
            if(quantitySearch != '' ) {
                if (quantitySearch == this.quantity) {
                    if (this.quantity) {
                        if (this.model.seatTiket.length > 0) {
                            console.log('Antes ', this.model.seatTiket);
                            const listAux =  this.model.seatTiket.filter( x => x.seatId == seatId);
                            console.log('Durante ', listAux);
                            for (let i = 0; i < listAux.length; i++) {
                                listAux[i].quantity = this.quantity;
                                valueIdList = true;
                                console.log('Despues ', this.model.seatTiket);
                                // if (listAux[i].seatId == seatId) {

                                // }
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
                    this.ticketPrice = this.ticketPrice * this.quantity;
                }
            }
        }, 1000);
    }
    saveTickectSeat() {
        this.loading = true;
        const fd = new FormData();
        console.log(this.model.seatTiket.length);
        for ( let i = 0 ; i < this.model.seatTiket.length; i++) {
            fd.append(`UserSeatList[${i}].UserId`, this.model.seatTiket[i].userId);
            fd.append(`UserSeatList[${i}].SeatId`, this.model.seatTiket[i].seatId);
            fd.append(`UserSeatList[${i}].Quantity`, this.model.seatTiket[i].quantity);
        }

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
}
