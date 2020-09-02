import { Effect, Actions, ofType} from '@ngrx/effects';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as RecipeActions from './recipes.actions';
import { Recipe } from '../recipe.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects{
    constructor(private action$ :Actions,
        private http1 : HttpClient,
        private dataService1 : DataStorageService,
        private store1 : Store<fromApp.AppState>) {}


    @Effect()
    fetchRecipes= this.action$.pipe(
        ofType(RecipeActions.FETCH_RECIPES), 
        switchMap(()=>{
            console.log('started');
            return this.http1.get<Recipe[]>('https://recipebook-8658e.firebaseio.com/recipes.json');
        }),
        map(recipes=>{
            console.log(recipes);
            let recipes1;
            if(!recipes){
                recipes1=[];
            }else{
                recipes1=recipes;
            }
            return recipes1.map(recipe=>{
                return {
                    ...recipe,
                    ingredients : recipe.ingredients ? recipe.ingredients : []
                }
            })
            // if(dataGroup === null){
            //     return [];
            // }else{
            // //     return dataGroup.map(data=>{
            // //     return {...data, ingredients : data.ingredients ? data.ingredients : []}
            // // });
            // const newArray=[];
            // for(let data in dataGroup){
            //     newArray.push({...dataGroup[data]});
            // }
            // // console.log(newArray);
            // return newArray;
            // } 
        }),
        tap(()=>{
            this.dataService1.fetchLoading.next(null); 
            console.log('heyyy');
        }),
        map((recipes)=>{
            return new RecipeActions.SetRecipes(recipes);
        })
    ) ;

    @Effect({dispatch : false})
    StoreRecipes=this.action$.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        withLatestFrom(this.store1.select('recipes')),
        switchMap(([actionData,recipesState])=>{
            return this.http1.put('https://recipebook-8658e.firebaseio.com/recipes.json',recipesState.recipes)
        })
    )
}