import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Form, Validators } from '@angular/forms';
import { RecipesServices } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {
  id :number;
  preview: boolean=false;
  constructor(private route1 : ActivatedRoute,private recipeService1 : RecipesServices
    ,private router1 : Router, private dataStorage1 :  DataStorageService) { }
  editMode=false;
  reactiveForm: FormGroup;
  ngOnInit(): void {
    this.route1.params
    .subscribe((params : Params)=>{
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      // console.log(this.editMode);
      // this.initRecipe()
    })

    //reactive form
    let recipeName='';
    let recipePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if(this.editMode){
      const currentRecipe= this.recipeService1.getRecipe(this.id);
      recipeName=currentRecipe.name;
      recipePath=currentRecipe.imagePath;
      recipeDescription=currentRecipe.description;
      if(currentRecipe['ingredients']){
        for(let ingredient of currentRecipe.ingredients){
          recipeIngredients.push(new FormGroup({
            'name' : new FormControl(ingredient.name,Validators.required),
            'amount' : new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        }
      }
      // console.log(recipeIngredients);
    }
      this.reactiveForm=new FormGroup({
        'name' : new FormControl(recipeName,Validators.required),
        'imagePath' : new FormControl(recipePath,[Validators.required,Validators.pattern('https?://.+')]),
        'description' : new FormControl(recipeDescription,Validators.required),
        'ingredientsArray' : recipeIngredients
      })
      // console.log(this.reactiveForm);
  }
  // initRecipe(){ }
  getControls(){
    return (<FormArray>this.reactiveForm.get('ingredientsArray')).controls;
  }
  onAddIngredients(){
    (<FormArray>this.reactiveForm.get('ingredientsArray')).push(new FormGroup({
      'name' : new FormControl(null,Validators.required),
      'amount' : new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }
  onSubmit(){
    // console.log(this.reactiveForm)
    const recipe1 : Recipe= {name :this.reactiveForm.get('name').value,
    description:this.reactiveForm.get('description').value,
    imagePath : this.reactiveForm.get('imagePath').value,
    ingredients : this.reactiveForm.get('ingredientsArray').value};
    // console.log(recipe1);
    if(this.editMode){
      this.recipeService1.updateRecipe(this.id,recipe1);
    }
    else{
      this.dataStorage1.postData(recipe1);
      this.recipeService1.addRecipe(recipe1);
      console.log(recipe1);
      console.log(this.recipeService1.getRecipes());
    }
    this.onCancel();
    console.log(this.reactiveForm);
  }
  onCancel(){
    if(this.editMode){
    this.router1.navigate(['../','detail'],{relativeTo: this.route1})
    }
    else{
    this.router1.navigate(['../'],{relativeTo: this.route1})
    }
  }
  deleteIngredient(id : number){
    (<FormArray>this.reactiveForm.get('ingredientsArray')).removeAt(id);
  }
}
