import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  constructor(private authService1 : AuthService){}
  ngOnInit(){
    this.authService1.autoLogInOnReload();
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
