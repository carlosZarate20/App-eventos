import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events-home',
  templateUrl: './events-home.component.html',
  styleUrls: ['./events-home.component.css']
})
export class EventsHomeComponent implements OnInit {
  items: Array<any> = [];
  constructor() { }

  ngOnInit() {
    this.items = [
      {image1: 'assest/images/banner1.jpg'},
      {image2: 'assest/images/banner2.jpg'},
      {image3: 'assest/images/banner3.jpg'},
      {image4: 'assest/images/banner4.jpg'}
    ]
  }

}
