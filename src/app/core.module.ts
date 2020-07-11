import { NgModule } from '@angular/core';
import { ShoppingService } from './shopping-list/shopping.service';
import { RecipesServices } from './recipes/recipes.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
    providers:[
        ShoppingService,
        RecipesServices,
        {
        provide:HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
  }
    ]
})
export class CoreModule{}