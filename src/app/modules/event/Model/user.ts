export class userModel {
    email: string;
    emailConfirm: string;
    password: string;
    passwordConfirm: string; 
    name: string;
    lastName: string;
    phone: string;
}
export class ticketModel {
    codeTmp: string;
    nameTicket: string;
    quantityAvailable : string;
    price : string;
    currencyType: string;
}
export class ticketTypeModel {
    codeTmp: string;
    codeTicket: string;
    nameTypeTicket: string;
    quantityAvailable : string;
}
