import {Ingredient} from '../shared/ingredient.model';
// import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";
// import { RecipesServices } from '../recipes/recipes.service';
// @Injectable({providedIn : 'root'})
@Injectable()
export class ShoppingService{
    constructor(){}
    private ingredients : Ingredient[] =[ 
        new Ingredient('Apples',5),
        new Ingredient('Oranges',10),
        // new Ingredient('Grapes',8)
      ];
      ingredientsUpdated= new Subject<Ingredient[]>();
      selectedIngredient = new Subject<number>();
      getIngredients(){
          return this.ingredients.slice();
      }
      addIngredient(ingredient1 : Ingredient){
          this.ingredients.push(ingredient1);
          this.ingredientsUpdated.next(this.ingredients.slice());
        //   console.log(this.ingredients);
      }
      addArrayOfIngredients(ingredients :Ingredient[]){
        // for(let i=0;i<ingredients.length;i++){
        //     this.ingredients.push(ingredients[i]);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientsUpdated.next(this.ingredients.slice());
      }
      returnIngredient(index : number){
        return this.ingredients[index];
      }
      updateIngredients(id,ingred){
        this.ingredients[id]=ingred;
        this.ingredientsUpdated.next(this.ingredients.slice());
      }
      deleteIngredient(id){
        this.ingredients.splice(id,1);
        this.ingredientsUpdated.next(this.ingredients.slice());
      }
}