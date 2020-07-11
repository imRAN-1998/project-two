import { Component, OnInit } from '@angular/core';
import { RecipesServices } from './recipes.service';
// import {Recipe} from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
  // providers: [RecipesServices]
})
export class RecipesComponent implements OnInit {
  public dataFromList;
  // funcForDetail(event){
  //   this.dataFromList=event;
  //   // console.log(this.dataFromList);
  // }




  constructor(private recipesService1 : RecipesServices) { }

  ngOnInit(): void {
    // this.recipesService1.selectedItem
    // .subscribe((data: Recipe)=>{
    //   this.dataFromList=data;
    // })
  }

}
