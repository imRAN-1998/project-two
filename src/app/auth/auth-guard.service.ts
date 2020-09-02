import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';


import * as fromApp from '../store/app.reducer';
import { AuthService } from './auth.service';

@Injectable({
    providedIn:'root'
})
export class AuthGuardService implements CanActivate{
    constructor(private authService1 : AuthService,
        private router1 : Router,
        private store1 : Store<fromApp.AppState>){}
    canActivate(route1 : ActivatedRouteSnapshot,
        state1 : RouterStateSnapshot) : Observable<boolean | UrlTree> | boolean | UrlTree{
            // return this.authService1.user1.pipe(map(user=>{
            //     const temp= user ? true :  false;
            //     if(temp){
            //         return true;
            //     }
            //     return this.router1.createUrlTree(['/auth']);
            // }))
            return this.store1.select('auth').pipe(map(authState=>{
                return authState.user;
            }),map(user=>{
                const temp= user ? true :  false;
                if(temp){
                    return true;
                }
                return this.router1.createUrlTree(['/auth']);
            }))
    }
}