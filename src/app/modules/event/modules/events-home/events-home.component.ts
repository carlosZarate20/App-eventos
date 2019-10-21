import { Component, OnInit } from '@angular/core';
import { HomeEventService } from '../../services/homeEvent.service';
import { Router } from '@angular/router';
import { categorieModel, categorieModel2 } from '../../Model/event';

@Component({
  selector: 'app-events-home',
  templateUrl: './events-home.component.html',
  styleUrls: ['./events-home.component.css']
})
export class EventsHomeComponent implements OnInit {
  items: Array<any> = [];
  public model: any = {};
  public validateList= false;
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
    const category: categorieModel[] = [];
    const category2: categorieModel2[] = [];
    this.model.listCategoriesAux = category;
    this.model.listCategoriesAux2 = category2;
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
        if(this.model.listCategories.length > 5) {
          this.validateList = true;
          
          
          for( let i = 0; i < this.model.listCategories.length; i++){
            if(this.model.listCategoriesAux.length < 4){
              const category = new categorieModel();
              category.id = this.model.listCategories[i].id;
              category.name = this.model.listCategories[i].name;
              this.model.listCategoriesAux.push(category); 
            } else{
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
