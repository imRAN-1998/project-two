import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { map, tap, exhaustMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { RecipesServices } from '../recipes/recipes.service';
import {Recipe} from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipes.actions';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService{
    constructor(private recipesService1 :  RecipesServices,
        private http1 : HttpClient,
        private authService1 :  AuthService,
        private store1 : Store<fromApp.AppState>){}
        fetchLoading = new BehaviorSubject<any>(null);
        fetchedData= new Subject<Recipe[]>();
    storeData(){
        // const recipes= this.recipesService1.getRecipes();
        let recipes;
        this.store1.select('recipes').subscribe(data=>{
            recipes=data.recipes;
        })
        this.http1.put('https://recipebook-8658e.firebaseio.com/recipes.json',recipes)
        .subscribe((data)=>{
            // console.log(data);
        })
    }
    postData(recipe : Recipe){
        // const recipes= this.recipesService1.getRecipes();
        this.http1.post('https://recipebook-8658e.firebaseio.com/recipes.json',recipe)
        .subscribe((data)=>{
            // console.log(data);
        })
    }
    fetchData(){
            return this.http1.get<Recipe[]>('https://recipebook-8658e.firebaseio.com/recipes.json')
            .pipe(map(dataGroup=>{
            // console.log(dataGroup);
                if(dataGroup === null){
                    return [];
                }else{
                //     return dataGroup.map(data=>{
                //     return {...data, ingredients : data.ingredients ? data.ingredients : []}
                // });
                const newArray=[];
                for(let data in dataGroup){
                    newArray.push({...dataGroup[data]});
                }
                // console.log(newArray);
                return newArray;
                }           
            }) 
            ,tap(recipes=>{
                // this.recipesService1.overWriteFetchedRecipes(recipes);
                // console.log(recipes);
                this.store1.dispatch(new RecipesActions.SetRecipes(recipes));
                this.fetchLoading.next(null);
            }))
        // .subscribe(data=>{
        //     // console.log(data);
        //     // this.fetchedData.next(data);
        // })
    }

}