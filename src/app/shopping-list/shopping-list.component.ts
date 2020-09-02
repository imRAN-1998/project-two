import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
// import * as FromShoppingList from './store/shopping-list.reducer';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListAction from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
  // providers : [ShoppingService]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredient : {ingredients : Ingredient[]} ;

  //store the subscription
  private newSubscription1 : Subscription;

  // func1(event)
  // {
  //   this.ingredient.push(event);
  // }
  constructor(private shoppingService1 : ShoppingService,
    private store1 : Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.newSubscription1=this.store1.select('shoppingList').subscribe(
      data=>{
        this.ingredient=data;
      }
    );
    // this.ingredient=this.shoppingService1.getIngredients();
    // console.log(this.ingredient);
    //getting the updated data and reassigning it to the ingredients array again
    // this.newSubscription1=this.shoppingService1.ingredientsUpdated
    // .subscribe((data : Ingredient[])=>{
    //   this.ingredient=data;
    // })
  }
  ngOnDestroy(){
    this.newSubscription1.unsubscribe();
  }
  selectItem(id){
    // console.log(id);
    // this.shoppingService1.selectedIngredient.next(id);
    this.store1.dispatch(new ShoppingListAction.StartEdit(id));

  }

}
