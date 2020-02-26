import { Component, OnInit } from '@angular/core';
import { HomeEventService } from '../../services/homeEvent.service';
import { Router } from '@angular/router';
import { categorieModel, categorieModel2 } from '../../Model/event';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-events-home',
  templateUrl: './events-home.component.html',
  styleUrls: ['./events-home.component.css']
})
export class EventsHomeComponent implements OnInit {
  items: Array<any> = [];
  public model: any = {};
  public validateList = false;
  public loading = false;
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
    ];
    this.image = '../../../../../assets/images/banner1.jpg';
    const category: categorieModel[] = [];
    const category2: categorieModel2[] = [];
    this.model.listCategoriesAux = category;
    this.model.listCategoriesAux2 = category2;
    this.getListEvent();
    this.getListBanner();
    this.getListCategories();
  }

  getListBanner() {
    this.eventService.getBanner().subscribe(
      res => {
          this.model.listEvent2 = res;
          console.log(this.model.listEvent2 );
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.model.listEvent2.length; i++) {
            this.model.listEvent2[i].image = `${environment.apiUrl}${this.model.listEvent2[i].image}`;
          }
      }
    );
  }

  getListEvent() {
    this.loading = true;
    this.eventService.getEvent().subscribe(
      res => {
          this.model.listEvent = res;
          console.log(this.model.listEvent );
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.model.listEvent.length; i++) {
            this.model.listEvent[i].image = `${environment.apiUrl}${this.model.listEvent[i].image}`;
          }
          this.loading = false;
      }
    );
  }
  getListCategories() {
    this.eventService.getCategories().subscribe(
      res => {

        this.model.listCategories = res;
        if (this.model.listCategories.length > 5) {
          this.validateList = true;
          // tslint:disable-next-line:prefer-for-of
          for ( let i = 0; i < this.model.listCategories.length; i++) {
            if (this.model.listCategoriesAux.length < 4) {
              const category = new categorieModel();
              category.id = this.model.listCategories[i].id;
              category.name = this.model.listCategories[i].name;
              this.model.listCategoriesAux.push(category);
            } else {
              const category2 = new categorieModel2();
              category2.id = this.model.listCategories[i].id;
              category2.name = this.model.listCategories[i].name;
              this.model.listCategoriesAux2.push(category2);

            }
          }
        } else {
          this.validateList = false;
        }
      }
    );
  }

  findCategory(categoryId: any) {
    this.eventService.getEventValue(categoryId).subscribe(
      res => {
          this.model.listEvent = res;
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.model.listEvent.length; i++) {
            this.model.listEvent[i].image = `${environment.apiUrl}${this.model.listEvent[i].image}`;
          }
      }
    );
  }

  passDetailsView(id: any) {
    this.router.navigate(['/event/detail' , id]);
  }
}
