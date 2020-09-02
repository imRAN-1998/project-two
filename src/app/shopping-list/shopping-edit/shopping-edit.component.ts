import { Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import {NgForm} from '@angular/forms'
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListAction from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
// import * as FromShoppingList from '../store/shopping-list.reducer';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('newVar1',{static: true}) formVar : NgForm;
  editMode : boolean = false;
  editIndex : number;
  // @ViewChild('nameInput') nameInput : ElementRef;
  // @ViewChild('amountInput') amountInput : ElementRef;
  // @Output() dataToShopList= new EventEmitter<any>();
  subscription1 : Subscription;
  constructor(private shoppingService1 : ShoppingService,
    private store1 : Store<fromApp.AppState>) { }
  onSubmit(data :NgForm){
    // console.log(data.value.name,data.value.amount);
  // const ingred = new Ingredient(this.nameInput.nativeElement.value,parseInt(this.amountInput.nativeElement.value));
    const ingred= new Ingredient(data.value.name,data.value.amount);
    // this.dataToShopList.emit(ingred);
    if(this.editMode){
      // this.shoppingService1.updateIngredients(this.editIndex,ingred);
      this.store1.dispatch(new ShoppingListAction.UpdateIngredient({ingredient: ingred}))
    }
    else{
      // this.shoppingService1.addIngredient(ingred);
      this.store1.dispatch(new ShoppingListAction.addIngredient(ingred));
    }
    data.reset();
    this.editMode=false;
    // console.log(ingred);
  }
  onDelete(){
    // this.shoppingService1.deleteIngredient(this.editIndex);
    this.store1.dispatch(new ShoppingListAction.DeleteIngredient());
    this.onClear();
  }
  onClear(){
    this.formVar.reset({
      amount: null
    })
    this.editMode=false;
    this.store1.dispatch(new ShoppingListAction.StopEdit());
  }
  editableIngredient : Ingredient;
  ngOnInit(): void {
    this.subscription1=this.store1.select('shoppingList').subscribe((data)=>{
      if(data.editedIngredientIndex > -1){
        this.editIndex=data.editedIngredientIndex;
        this.editableIngredient=data.editedIngredient;
        this.editMode=true;
        this.formVar.setValue({
              name : this.editableIngredient.name,
              amount : this.editableIngredient.amount
            })
      }else{
        this.editMode=false;
      }
    })
    // this.subscription1= this.shoppingService1.selectedIngredient
    // .subscribe((data)=>{
    //   this.editIndex=data;
    //   this.editMode=true;
    //   this.editableIngredient= this.shoppingService1.returnIngredient(data);
    //   // console.log(this.editableIngredient);
    //   this.formVar.setValue({
    //     name : this.editableIngredient.name,
    //     amount : this.editableIngredient.amount
    //   })
    // })
  }
  ngOnDestroy(){
    this.store1.dispatch(new ShoppingListAction.StopEdit());
    this.subscription1.unsubscribe();
  }

}
