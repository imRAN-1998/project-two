import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
  // providers : [ShoppingService]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredient : Ingredient[] =[];

  //store the subscription
  private newSubscription1 : Subscription;

  // func1(event)
  // {
  //   this.ingredient.push(event);
  // }
  constructor(private shoppingService1 : ShoppingService) { }

  ngOnInit(): void {
    this.ingredient=this.shoppingService1.getIngredients();
    // console.log(this.ingredient);
    //getting the updated data and reassigning it to the ingredients array again
    this.newSubscription1=this.shoppingService1.ingredientsUpdated
    .subscribe((data : Ingredient[])=>{
      this.ingredient=data;
    })
  }
  ngOnDestroy(){
    this.newSubscription1.unsubscribe();
  }
  selectItem(id){
    // console.log(id);
    this.shoppingService1.selectedIngredient.next(id);

  }

}
