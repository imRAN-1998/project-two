import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, AuthResponseType } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginMode=true;
  isloading:boolean=false;
  error: string;
  myForm: FormGroup;
  constructor(private authService1 : AuthService,
    private router1 : Router) { }
  changeMode(){
    this.loginMode = !this.loginMode;
  }
  ngOnInit(): void {
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
    this.isloading=true;
    //here we are using same logic of subscribing twice so simplify it with a observable variable
    let receivedObservable: Observable<AuthResponseType>;
    if(!this.loginMode){
      receivedObservable=this.authService1.signUp(email,password)
      this.error=null;
      
    }else{
      // console.log('login');
      receivedObservable=this.authService1.login(email,password)
      this.error=null;
    }
    receivedObservable
    .subscribe(responseData=>{
      this.isloading=false;
      // console.log(responseData);
      this.router1.navigate(['/recipes']);
      },
      error=>{
      this.isloading=false;
        this.error= error;
      })
    this.myForm.reset();
  }

  closeFunc(event){
    this.error=null;
  }

}
