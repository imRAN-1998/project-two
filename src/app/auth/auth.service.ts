import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';

export interface AuthResponseType{
    kind :  string;
    idToken : string;
    email: string;
    refreshToken:  string;
    expiresIn :  string;
    localId :  string;
    registered? : boolean;
}
@Injectable({
    providedIn:'root'
})
export class AuthService{
    constructor(private http1 : HttpClient,
        private router1 : Router) {}
    user1 = new BehaviorSubject<User>(null);
        timeoutInfo: any;
    logOut(){
        this.user1.next(null);
        this.router1.navigate(['/auth'])
        localStorage.removeItem('userPresent');
        if(this.timeoutInfo){
            clearTimeout(this.timeoutInfo);
        }
        this.timeoutInfo=null;
    }
    autoLogOutAfterTokenExpired(expiredData: number){
        console.log(expiredData)
        this.timeoutInfo=setTimeout(()=>{
            this.logOut();
        },expiredData)
    }

    autoLogInOnReload(){
        const user: {
            email: string;
            id: string;
            _token:  string;
            _tokenExpiredDate: string;
        }=JSON.parse(localStorage.getItem('userPresent'));
        // console.log(user);
        if(!user){
            return;
        }
        const user1= new User(user.email,user.id,user._token,new Date(user._tokenExpiredDate));
        if(user1.token){
            // console.log(user._tokenExpiredDate);
            let expireTimeOnReload=new Date(user._tokenExpiredDate).getTime() - new Date().getTime();
            if(expireTimeOnReload<0){
                expireTimeOnReload=0;
            }
            // console.log(expireTimeOnReload);
            this.user1.next(user1);
            this.autoLogOutAfterTokenExpired(expireTimeOnReload);
        }
    }

    signUp(email : string , password: string ){
        return this.http1.post<AuthResponseType>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.APIkey,{
            email : email,
            password: password,
            returnSecureToken : true
        }).pipe(catchError(errorResponse=>{
            // console.log(errorResponse);
            return throwError(this.errorHandle(errorResponse));
        }))
    }
    login(email: string , password: string){
        return this.http1.post<AuthResponseType>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.APIkey,
        {
            email : email,
            password: password,
            returnSecureToken : true
        })
        .pipe(catchError(errorRes=>{
            return throwError(this.errorHandle(errorRes))
        })
        ,tap((res)=>{
            this.handleUser(res.email,res.localId,res.idToken,+res.expiresIn)
        }
        ))
    }
    //use PRIVATE if u gonna use that function or data only in that component...
    private errorHandle(errorResponse : HttpErrorResponse){
        let errorMsg='An unknown error has occurred';
            if(!errorResponse.error || !errorResponse.error.error){
                return errorMsg;
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
            return errorMsg;
    }
    private handleUser(email : string ,id :  string ,token :  string ,expiringDate :  number ){
        const expireData1  : Date= new Date ( new Date().getTime() + (expiringDate) * 1000);
        const user= new User(email,id,token,expireData1);
        // console.log(user);
        this.user1.next(user);
        localStorage.setItem('userPresent',JSON.stringify(user));
        this.autoLogOutAfterTokenExpired(expiringDate *  1000);
    }
}