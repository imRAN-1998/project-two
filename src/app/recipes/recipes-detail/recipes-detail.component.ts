import { Component, OnInit, Input, ViewChild , ElementRef, HostListener} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { ShoppingService } from 'src/app/shopping-list/shopping.service';
import { RecipesServices } from '../recipes.service';
// import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
// import { EventEmitter } from 'protractor';
// import {style} from '@angular/animations'
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipes.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  public manageRecipeClick=false;
  id: number;
  // @Input('recDetailed') r;
  r : Recipe;
  // r : {name: string, description : string, imagePath : string} ={name: 'shawarma1',description :'Chicken stuffed item',imagePath : 'https://www.sbs.com.au/food/sites/sbs.com.au.food/files/owk_3069_chicken_shawarma_horizontal_1.jpg'};
  
  @ViewChild('size1',{static:true}) s : ElementRef;
  @ViewChild('search2') elRef: ElementRef;
  constructor(private shoppingService1 : ShoppingService,
    private recipeService1 : RecipesServices,
    private route1 : ActivatedRoute,
    private router1 : Router,
    // private dataStorage1 : DataStorageService,
    private store1 : Store<fromApp.AppState>) {
      // let fullrecipes;
      // this.dataStorage1.fetchData().subscribe((data)=>{
      //   fullrecipes=data;
      //   console.log(fullrecipes);
      // }
      // );
      // this.route1.params.subscribe(data=>{
      //   this.r=fullrecipes[+data['id']];
      //   console.log('fireddd')
      // })
  }
  ngOnInit() : void {
    this.s.nativeElement.style.transition="1s";
    // this.id= +this.route1.snapshot.params['id'];
    // console.log(p);
    // this.r=this.recipeService1.getRecipe(this.id);
    // this.route1.params
    // .subscribe((param : Params)=>{
    //   // const recip111=this.recipeService1.getRecipes();
    //   // this.r=this.recipeService1.getRecipe(+param['id']);
    //   this.id= +param['id'];
    //   this.store1.select('recipes').pipe(map(recipesState=>{
    //     return recipesState.recipes.find((recipe,index)=>{
    //       return this.id===index;
    //     })
    //   })).subscribe(recipe=>{
    //     this.r=recipe;
    //   })
    //   // console.log(recip111);
    // })
    this.route1.params.pipe(map((params : Params)=>{
      return +params['id'];
    }),
    switchMap(id=>{
      this.id=id;
      return this.store1.select('recipes');
    }),
    map(recipesData=>{
      return recipesData.recipes.find((recipe,index)=>{
        return index===this.id;
      })
    })
    ).subscribe(recipe=>{
      this.r=recipe;
    })
    //ngOnInit fires when ever this component is used...
    // console.log(this.r);
  }
  funcLeave(){
    this.s.nativeElement.style.backgroundSize="100% 100%";
      // this.s.nativeElement.style.transition="1s";
  }
  funcEnter(){
    this.s.nativeElement.style.backgroundSize="150% 150%";
      // this.s.nativeElement.style.transition="1s";
  }
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.manageRecipeClick = this.elRef.nativeElement.contains(event.target) ? this.manageRecipeClick : false;
    // console.log(event.target,this.manageRecipeClick);
  }
  toShoppingList(){
    // this.recipeService1.addIngredientsOfRecipe(this.r.ingredients);
    let ingred;
    if(!this.r.ingredients){
      ingred=[];
    }else{
      ingred=this.r.ingredients;
    }
    this.store1.dispatch(new ShoppingListActions.addIngredients(ingred));

    // this.shoppingService1.addArrayOfIngredients(this.r.ingredients); //using shoppingservice straightaway
    // console.log(this.r.ingredients);
  }
  onDeleteRecipe(){
    // this.recipeService1.deleteRecipe(this.id);
    this.store1.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router1.navigate(['/recipes']);
  }  


}
