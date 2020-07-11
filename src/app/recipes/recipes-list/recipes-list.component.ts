import { Component, OnInit, OnDestroy} from '@angular/core';
import {Recipe} from '../recipe.model';
import { RecipesServices } from '../recipes.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
// import { EventEmitter } from 'protractor';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit ,OnDestroy{

  recipes : Recipe[]=[];
  fetchLoading=null;
  // @Output() dataFromItemToList= new EventEmitter<any>();
  dataFromItem;
  subscription1 : Subscription;
  subscription2 : Subscription;
  // out1Data(event){
  //   // this.dataFromItem=event;
  //   this.dataFromItemToList.emit(event);
  // }
  
  constructor(private recipesService1 : RecipesServices,
    private dataStorage1 :  DataStorageService) { }

  ngOnInit(): void {
    this.recipes=this.recipesService1.getRecipes();
    this.subscription1= this.recipesService1.recipeschanged.subscribe((recipes : Recipe[])=>{
      this.recipes=recipes;
    })
    // this.dataStorage1.fetchData().subscribe(recipes=>{
    //   this.recipes=recipes;
    // })
    // console.log(this.recipes);
    this.subscription2=this.dataStorage1.fetchLoading.subscribe(data=>{
      this.fetchLoading=data;
    })
  }
  ngOnDestroy(){
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

}
