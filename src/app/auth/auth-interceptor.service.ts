import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService1 : AuthService,
        private store1 : Store<fromApp.AppState>) {}
    intercept(req : HttpRequest<any>, next : HttpHandler){
        // return this.authService1.user1.pipe(take(1),exhaustMap(user=>{
        //     if(!user){
        //         return next.handle(req);
        //     }
        //     const newReq= req.clone({params : new HttpParams().set('auth',user.token)});
        //     return next.handle(newReq);
        // }))
        return this.store1.select('auth').pipe(take(1),map(authData=>{
                return authData.user;
            }),
            exhaustMap(user=>{
            if(!user){
                return next.handle(req);
            }
            const newReq= req.clone({params : new HttpParams().set('auth',user.token)});
            return next.handle(newReq);
        }))
    }
} 