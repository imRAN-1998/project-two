import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect} from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { switchMap, catchError, map , tap} from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { environment } from '../../../environments/environment';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseType{
    kind :  string;
    idToken : string;
    email: string;
    refreshToken:  string;
    expiresIn :  string;
    localId :  string;
    registered? : boolean;
}

// to reduce redundant information
const handleAuthentication= (email : string, localId : string, idToken : string, expiresIn :  number)=>{
    const expirationDate1 = new Date ( new Date().getTime() + (expiresIn) * 1000);
    const user= new User(email,localId,idToken,expirationDate1);
    localStorage.setItem('userPresent',JSON.stringify(user));
                return new AuthActions.AuthenticateSuccess({
                    email : email,
                    userId : localId,
                    token : idToken,
                    expirationDate : expirationDate1,
                    redirect:true
                })
}

const handleError=(errorResponse :any)=>{
    let errorMsg='An unknown error has occurred';
            if(!errorResponse.error || !errorResponse.error.error){
                return of(new AuthActions.AuthenticateFail(errorMsg));
            }
            const errorRes= errorResponse.error.error.message;
            switch(errorRes){
                case 'EMAIL_EXISTS':
                    errorMsg="Email ID already exists";
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMsg="Email ID is not registered";
                    break;
                case 'INVALID_PASSWORD': 
                errorMsg="Password entered is Invalid";
                    break;
            }
                return of(new AuthActions.AuthenticateFail(errorMsg));
}

@Injectable()
export class AuthEffects{
    @Effect()
    authSignUp =this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((authData : AuthActions.SignupStart)=>{
            return this.http1.post<AuthResponseType>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.APIkey,{
            email : authData.payload.email,
            password: authData.payload.password,
            returnSecureToken : true
        }).pipe(
            tap(resData=>{
                this.authService1.autoLogOutAfterTokenExpired(+resData.expiresIn * 1000);
            }),
            map(resData=>{
                return handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
            }),
            catchError(errorResponse=>{
                return handleError(errorResponse);
            })
        )
        })
    );


    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData : AuthActions.LoginStart)=>{
            return this.http1.post<AuthResponseType>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.APIkey,
        {
            email : authData.payload.email,
            password: authData.payload.password,
            returnSecureToken : true
        }).pipe(
            tap(resData=>{
                this.authService1.autoLogOutAfterTokenExpired(+resData.expiresIn * 1000);
            }),
            map(resData=>{
                return handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
            }),
            catchError(errorResponse=>{
                return handleError(errorResponse);
            }),
        )
        })
    );

    //navigation
    @Effect({dispatch :false})
    authSuccess= this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((authenicationSuccess1 : AuthActions.AuthenticateSuccess)=>{
            if(authenicationSuccess1.payload.redirect){
                this.router1.navigate(['/']);
            }
        })
    );
    @Effect({dispatch :false})
    authLogoutSuccess= this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(()=>{
            this.router1.navigate(['/auth']);
            localStorage.removeItem('userPresent');
            this.authService1.clearTimerAfterLogout();
        })
    );

    @Effect()
    authAutoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(()=>{
            const user: {
                email: string;
                id: string;
                _token:  string;
                _tokenExpiredDate: string;
            }=JSON.parse(localStorage.getItem('userPresent'));
            if(!user){
                return {type : 'DUMMY'};
            }
            const user1= new User(user.email,user.id,user._token,new Date(user._tokenExpiredDate));
            if(user1.token){
                let expireTimeOnReload=new Date(user._tokenExpiredDate).getTime() - new Date().getTime();
                console.log(user._tokenExpiredDate);
                console.log(expireTimeOnReload);
                if(expireTimeOnReload<0){
                    expireTimeOnReload=0;
                }
                this.authService1.autoLogOutAfterTokenExpired(expireTimeOnReload);
                return new AuthActions.AuthenticateSuccess({email : user.email,
                    userId : user.id,
                    token : user._token,
                    expirationDate : new Date(user._tokenExpiredDate),
                    redirect : false})
                // this.autoLogOutAfterTokenExpired(expireTimeOnReload);
            }
            return {type : 'DUMMY'};
        })
    )


    constructor(private actions$ : Actions,
        private http1 : HttpClient,
        private router1 : Router,
        private authService1 : AuthService){}
}