import { Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import {NgForm} from '@angular/forms'
import { Subscription } from 'rxjs';
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
  constructor(private shoppingService1 : ShoppingService) { }
  onSubmit(data :NgForm){
    // console.log(data.value.name,data.value.amount);
  // const ingred = new Ingredient(this.nameInput.nativeElement.value,parseInt(this.amountInput.nativeElement.value));
    const ingred= new Ingredient(data.value.name,data.value.amount);
    // this.dataToShopList.emit(ingred);
    if(this.editMode){
      this.shoppingService1.updateIngredients(this.editIndex,ingred);
    }
    else{
      this.shoppingService1.addIngredient(ingred);
    }
    data.reset({
      amount : 1
    });
    this.editMode=false;
    // console.log(ingred);
  }
  onDelete(){
    this.shoppingService1.deleteIngredient(this.editIndex);
    this.onClear();
  }
  onClear(){
    this.formVar.reset({
      amount: 1
    })
    this.editMode=false;
  }
  editableIngredient : Ingredient;
  ngOnInit(): void {
    this.subscription1= this.shoppingService1.selectedIngredient
    .subscribe((data)=>{
      this.editIndex=data;
      this.editMode=true;
      this.editableIngredient= this.shoppingService1.returnIngredient(data);
      // console.log(this.editableIngredient);
      this.formVar.setValue({
        name : this.editableIngredient.name,
        amount : this.editableIngredient.amount
      })
    })
  }
  ngOnDestroy(){
    this.subscription1.unsubscribe();
  }

}
