import { NgModule } from "@angular/core";
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
// import { RecipesModule } from './recipes/recipes.module';
// import { ShoppingModule } from './shopping-list/shopping.module';
// import { SharedModule } from './shared/shared.module';
// import { AuthModule } from './auth/auth.module';

const appRoutes : Routes=[
    {path : '', redirectTo : 'recipes', pathMatch :'full'},
    {
        path : 'recipes', loadChildren:()=> import('./recipes/recipes.module').then(m=>m.RecipesModule)
    },
    {
        path : 'shoppingList', loadChildren:()=> import('./shopping-list/shopping.module').then(m=>m.ShoppingModule)
    },
    {
        path : 'auth', loadChildren:()=> import('./auth/auth.module').then(m=>m.AuthModule)
    },
    {path : '**',redirectTo : 'recipes'}
]
@NgModule({
    imports :[RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}),
        // RecipesModule,
        // ShoppingModule,
        // SharedModule,
        // AuthModule
    ],
    exports : [RouterModule]
})
export class AppRoutingModule{

}