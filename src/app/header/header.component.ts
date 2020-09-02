import { Component, OnInit ,Output,EventEmitter, HostListener, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipes.actions';
import { Recipe } from '../recipes/recipe.model';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public clickManage=false;
  @ViewChild('child1') elRef : ElementRef;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    if(this.elRef){
      this.clickManage = this.elRef.nativeElement.contains(event.target) ? this.clickManage : false;
    }
    // console.log(this.elRef.nativeElement.contains(event.target),this.clickManage);
  }
  @Output() rec=new EventEmitter<any>();
  @Output() shop=new EventEmitter<any>();

  constructor(private dataStorage1 : DataStorageService,
    private authService1 : AuthService,
    private store1 : Store<fromApp.AppState>) { }


  LoggedIn=false;
  subscription1 :  Subscription;
  recipesFunc(){
    this.rec.emit({value1 : true,value2 : false});
  }
  shoppingListFunc(){
    this.shop.emit({value1 : false ,value2 : true});
  }
  ngOnInit(): void {
    // this.subscription1= this.authService1.user1.subscribe(user=>{
    //   // console.log(user);
    //   this.LoggedIn= user ? true :  false ;
    // })
    this.subscription1= this.store1.select('auth').pipe(map(authState=>{
      return authState.user;
    })).subscribe(user=>{
      // console.log(user);
      this.LoggedIn= user ? true :  false ;
    })
  }
  onSaveData(){
    // this.dataStorage1.storeData();
    this.store1.dispatch(new RecipeActions.StoreRecipes());
  }
  onFetchData(){
    this.dataStorage1.fetchLoading.next('heyy');
    // this.dataStorage1.fetchData().subscribe();
    this.store1.dispatch(new RecipeActions.FetchRecipes());
  }
  logOut(){
    // this.authService1.logOut();
    this.store1.dispatch(new AuthActions.Logout());
  }
  ngOnDestroy(){
    this.subscription1.unsubscribe();
  }

}
