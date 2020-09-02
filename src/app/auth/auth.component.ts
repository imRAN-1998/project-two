import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  loginMode=true;
  isloading:boolean=false;
  error: string;
  myForm: FormGroup;
  storeSubscription :Subscription;
  constructor(private authService1 : AuthService,
    private router1 : Router,
    private store1 : Store<fromApp.AppState>) { }
  changeMode(){
    this.loginMode = !this.loginMode;
  }
  ngOnInit(): void {

    this.storeSubscription = this.store1.select('auth').subscribe(authData=>{
      this.isloading=authData.loading;
      this.error=authData.authError;
    })


    this.myForm= new FormGroup({
      'email':  new FormControl(null,[Validators.required,Validators.email]),
      'password' : new FormControl(null,[Validators.required,Validators.minLength(8)])
    })
    
  }
  onSubmit(){
    if(this.myForm.invalid){
      return;
    }
    const email=this.myForm.get('email').value;
    const password=this.myForm.get('password').value;
    // this.isloading=true;
    //here we are using same logic of subscribing twice so simplify it with a observable variable
    // let receivedObservable: Observable<AuthResponseType>;
    if(!this.loginMode){
      // receivedObservable=this.authService1.signUp(email,password);
      this.store1.dispatch(new AuthActions.SignupStart({email : email,password : password}));
      // console.log(receivedObservable);
      // this.error=null;
      
    }else{
      // console.log('login');
      this.store1.dispatch(new AuthActions.LoginStart({email : email,password : password}));
      // receivedObservable=this.authService1.login(email,password)
      // this.error=null;
    }
    // receivedObservable
    // .subscribe(responseData=>{
    //   this.isloading=false;
    //   // console.log(responseData);
    //   this.router1.navigate(['/recipes']);
    //   },
    //   error=>{
    //   this.isloading=false;
    //     this.error= error;
    //   })
    this.myForm.reset();
  }

  closeFunc(event){
    // this.error=null;
    this.store1.dispatch(new AuthActions.ClearError());
  }

  ngOnDestroy(){
    if(this.storeSubscription){
      this.storeSubscription.unsubscribe();
    }
  }

}
