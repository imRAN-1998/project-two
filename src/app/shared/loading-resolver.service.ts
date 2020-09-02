
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { DataStorageService } from './data-storage.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipesServices } from '../recipes/recipes.service';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipes.actions';
import { take } from 'rxjs/operators';
@Injectable({
    providedIn:'root'
})
export class LoadingResolverService implements Resolve<Recipe[]>{
    constructor(private dataStorage1 : DataStorageService,
        private recipesService1 : RecipesServices,
        private store1  : Store<fromApp.AppState>,
        private actions$ : Actions ){}
    resolve(route1: ActivatedRouteSnapshot,
        state1 :  RouterStateSnapshot){
            let new1 : Recipe[];
            this.store1.select('recipes').pipe(take(1)).subscribe(data=>{
                // console.log(data.recipes);
                new1 =data.recipes;
            })
            // const new1 =this.recipesService1.getRecipes();
            // // console.log(new1);
            // if(new1.length==0){
            //     return this.dataStorage1.fetchData();
            // }
            if(new1.length==0){
                this.store1.dispatch(new RecipeActions.FetchRecipes());
                return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES),take(1));
            }
    }
}