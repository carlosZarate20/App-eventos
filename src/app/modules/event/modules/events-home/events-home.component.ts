import { Component, OnInit } from '@angular/core';
import { HomeEventService } from '../../services/homeEvent.service';

@Component({
  selector: 'app-events-home',
  templateUrl: './events-home.component.html',
  styleUrls: ['./events-home.component.css']
})
export class EventsHomeComponent implements OnInit {
  items: Array<any> = [];
  public model: any = {};
  constructor(public eventService: HomeEventService) { 
    this.model.listEvent = [];
  }

  ngOnInit() {
    this.items = [
      {image1: 'assest/images/banner1.jpg'},
      {image2: 'assest/images/banner2.jpg'},
      {image3: 'assest/images/banner3.jpg'},
      {image4: 'assest/images/banner4.jpg'}
    ]
    this.getListEvent();
  }

  getListEvent(){
    this.eventService.getEvent().subscribe(
      res => {
          this.model.listEvent = res;

          for(var i = 0; i< this.model.listEvent.length; i++ ){
            this.model.listEvent[i].image = 'http://edumoreno27-001-site6.etempurl.com' + this.model.listEvent[i].image
          }
          console.log(res);
      }
  );
  }
}
