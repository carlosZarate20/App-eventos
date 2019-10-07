import { ticketModel } from './user';

export class EventModel{
    public name: string;
    public description: string;
    public aditionalInformation: string;
    public file: any;
    public fileImageLocalization: any;
    public eventCategoryName: string;
    public urlVideo: any;
    public startDate: string;
    public endDate: string;
    public adress: string;
    public cityName: string;
    public reference: string;
    public eventCategoryId: any;
    public cityId: any;
    public document: any;
    public socialReason: any;
    public bankNumber: any;
    public bank: any;
    public bankCurrencyTipe: any;
    public personContact: any;
    public phoneContact: any;
    public emailContact: any;
    public listTiket: Array<ticketModel> = [];
}