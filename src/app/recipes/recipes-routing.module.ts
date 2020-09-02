import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { RecipesStartComponent } from './recipes-start/recipes-start.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { LoadingResolverService } from '../shared/loading-resolver.service';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';

const routes1 : Routes=[
    {path : '', component : RecipesComponent,canActivate : [AuthGuardService],children : [
        {path : '', component : RecipesStartComponent},
        {path: 'new',component: NewRecipeComponent},
        {path: ':id/edit',component: NewRecipeComponent , resolve:[LoadingResolverService]},
        {path : ':id/detail' , component : RecipesDetailComponent, resolve:[LoadingResolverService]}
    ]}
];
 
@NgModule({
 imports : [
    RouterModule.forChild(routes1)
 ],
 exports : [RouterModule]
})
export class RecipesRoutingModule{}