import {Recipe} from './recipe.model';
import {  Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {ShoppingService} from '../shopping-list/shopping.service'
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListAction from '../shopping-list/store/shopping-list.actions';
// import * as FromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromApp from '../store/app.reducer';
@Injectable({
  providedIn:'root'
})
export class RecipesServices{
  //   private recipes : Recipe[]=[
  //     new Recipe('Shawarma',
  //     'Chicken stuffed delicious item',
  //     'https://www.sbs.com.au/food/sites/sbs.com.au.food/files/owk_3069_chicken_shawarma_horizontal_1.jpg',
  //      [new Ingredient('Chicken breast(In grams)',250),new Ingredient('Vegetable oil(In tbps)',2)]),
  // new Recipe('Burger',
  // 'Veg paneer burger with more vegetable stuffing for limited cost',
  // 'https://content.fortune.com/wp-content/uploads/2019/05/mcdonalds_bigvegants.jpg',
  // [new Ingredient('Bread',2),new Ingredient('Meat(In slice)',1)]),
  // new Recipe('Pizza',
  // 'Delicious pizza with toppings',
  // 'https://d4t7t8y8xqo0t.cloudfront.net/resized/750X436/group%2F107%2Fshutterstock_84904912.jpg',
  // [new Ingredient('Flour(in grams)',300),new Ingredient('Dry yeast(In packets)',1)]),
  // ];
  private recipes : Recipe[]=[];
  constructor(private shoppingService1 : ShoppingService,
    private store1 : Store<fromApp.AppState>) {}
  // selectedItem= new EventEmitter<Recipe>();
  recipeschanged = new Subject<Recipe[]>();
  // dummyRecipe(){
  //   const rrr=new Recipe('',
  //       '',
  //       'https://content.fortune.com/wp-content/uploads/2019/05/mcdonalds_bigvegants.jpg',
  //        []);
  //       //  console.log(rrr);
  //   return rrr;
  // }
  // getRecipes(){
  //     return this.recipes.slice();
  // }
  // overWriteFetchedRecipes(newRecipes: Recipe[]){
  //   this.recipes=newRecipes;
  //   this.recipeschanged.next(this.recipes.slice());
  // }
  // getRecipe(id : number){
  //   // const recipe=this.recipes.find((r,index)=>{
  //   //   return index === id;
  //   // })
  //   // console.log(id);
  //   let recipe;
  //   for(let i=0;i<this.recipes.length;i++){
  //     if(id==i){
  //       recipe=this.recipes[i];
  //       break;
  //     }
  //   }
  //   return recipe;
  // }
  // addIngredientsOfRecipe(ingredients : Ingredient[]){
  //   if(!ingredients){
  //     ingredients=[];
  //   }
  //   // this.shoppingService1.addArrayOfIngredients(ingredients);
  //   this.store1.dispatch(new ShoppingListAction.addIngredients(ingredients));
  // }
  // addRecipe(recipe : Recipe){
  //   this.recipes.push(recipe);
  //   console.log(this.recipes);
  //   this.recipeschanged.next(this.recipes.slice());
  // }
  // updateRecipe(id: number, recipe : Recipe){
  //   this.recipes[id]=recipe;
  //   this.recipeschanged.next(this.recipes.slice());
  // }
  // deleteRecipe(id){
  //   this.recipes.splice(id,1);
  //   this.recipeschanged.next(this.recipes.slice());
  // }
}