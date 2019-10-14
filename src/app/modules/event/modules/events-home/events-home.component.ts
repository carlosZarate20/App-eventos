import { Component, OnInit } from '@angular/core';
import { HomeEventService } from '../../services/homeEvent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-home',
  templateUrl: './events-home.component.html',
  styleUrls: ['./events-home.component.css']
})
export class EventsHomeComponent implements OnInit {
  items: Array<any> = [];
  public model: any = {};
  image: any;
  constructor(public eventService: HomeEventService, public router: Router) { 
    this.model.listEvent = [];
    this.model.listEvent2 = [];
    this.model.listCategories = [];
  }

  ngOnInit() {
    this.items = [
      {image1: 'assest/images/banner1.jpg'},
      {image2: 'assest/images/banner2.jpg'},
      {image3: 'assest/images/banner3.jpg'},
      {image4: 'assest/images/banner4.jpg'}
    ]
    this.image = '../../../../../assets/images/banner1.jpg';
    this.getListEvent();
    this.getListCategories();
  }

  getListEvent(){
    this.eventService.getEvent().subscribe(
      res => {
          this.model.listEvent = res;
          this.model.listEvent2 = res;

          for(var i = 0; i< this.model.listEvent.length; i++ ){
            this.model.listEvent[i].image = 'http://edumoreno27-001-site6.etempurl.com' + this.model.listEvent[i].image
          }
          console.log(res);
      }
    );
  }
  getListCategories() {
    this.eventService.getCategories().subscribe(
      res => {
          this.model.listCategories = res;
          console.log(res);
      }
    );
  }

  findCategory(categoryId: any) {
    this.eventService.getEventValue(categoryId).subscribe(
      res => {
          this.model.listEvent = res;

          for(var i = 0; i< this.model.listEvent.length; i++ ){
            this.model.listEvent[i].image = 'http://edumoreno27-001-site6.etempurl.com' + this.model.listEvent[i].image
          }
          console.log(res);
      }
    );
  }

  passDetailsView(id: any){
    this.router.navigate(['/event/detail' , id])
  }
}
