export class userModel {
    email: string;
    emailConfirm: string;
    password: string;
    passwordConfirm: string; 
    name: string;
    lastName: string;
    phone: string;
}
export class ticketModelAux {
    codeTmp: string;
    nameTicket: string;
    quantityAvailable : any;
    price : string;
    currencyType: string;
}
export class ticketModel {
    codeTmp: string;
    nameTicket: string;
    quantityAvailable : any;
    price : string;
    currencyType: string;
}
export class ticketTypeModel {
    codeTmp: string;
    number: Int16Array;
    codeTicket: string;
    nameTypeTicket: string;
    type: string;
    quantity: any;
    name: string;
}
export class ticketTableModel {
    codeTmp: string;
    number: Int16Array;
    codeTicket: string;
    nameTypeTicket: string;
    type: string;
    quantity: any;
    name: string;
}
export class ticketTypeModelList {
    codeTmp: string;
    idCodeTicket: any;
    number: Int16Array;
    codeTicket: string;
    name: string;
    type: string;
    quantity: any;
}