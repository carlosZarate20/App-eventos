import { Component, OnInit } from '@angular/core';
import { NullTemplateVisitor } from '@angular/compiler';
import { HttpClient } from 'selenium-webdriver/http';
import { CreateEventService } from '../../services/createEvent.service';

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.css']
})

export class CreateEventComponent implements OnInit {
    en: any;
    selectedFiles = null;
    public model: any = {};
    constructor(public createService: CreateEventService){
        this.model.list = [];
        
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
    }
    selectFile(event){
        this.selectedFiles = event.target.files[0];

    }
    getCities(){
        this.createService.getCities().subscribe(
            res => {
                this.model.list = res;
                console.log(res);
            }
        );
    }
    uploadImage(){
        const fd = new FormData();
        fd.append('file', this.selectedFiles, this.selectedFiles.name);

        this.createService.register(fd).subscribe(
            (res:any) => {
                console.log(res.name);
            },
            (err: any) => {
                console.log('Error Imagen');
            }
        );
    }


}