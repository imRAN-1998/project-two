import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthService } from './auth/auth.service';
import * as AuthActions from './auth/store/auth.actions';
import * as fromApp from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  constructor(private authService1 : AuthService,
    private store1 : Store<fromApp.AppState>){}
  ngOnInit(){
    // this.authService1.autoLogInOnReload();
    this.store1.dispatch(new AuthActions.AutoLogin());
  }
  // public recipesIf=true;
  // public shoppingIf=false;
  // recFunc1(data){
  //   this.recipesIf=data.value1;
  //   this.shoppingIf=data.value2;
  // }
  // shopFunc1(data){
  //   this.recipesIf=data.value1;
  //   this.shoppingIf=data.value2;
  // }
}
