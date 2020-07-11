
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { DataStorageService } from './data-storage.service';
import { Recipe } from '../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { RecipesServices } from '../recipes/recipes.service';
@Injectable({
    providedIn:'root'
})
export class LoadingResolverService implements Resolve<Recipe[]>{
    constructor(private dataStorage1 : DataStorageService,
        private recipesService1 : RecipesServices ){}
    resolve(route1: ActivatedRouteSnapshot,
        state1 :  RouterStateSnapshot){
            const new1 =this.recipesService1.getRecipes();
            // console.log(new1);
            if(new1.length==0){
                return this.dataStorage1.fetchData();
            }
    }
}