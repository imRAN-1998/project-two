import { Component, OnInit ,Output,EventEmitter, HostListener, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs'
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
    private authService1 : AuthService) { }
  LoggedIn=false;
  subscription1 :  Subscription;
  recipesFunc(){
    this.rec.emit({value1 : true,value2 : false});
  }
  shoppingListFunc(){
    this.shop.emit({value1 : false ,value2 : true});
  }
  ngOnInit(): void {
    this.subscription1= this.authService1.user1.subscribe(user=>{
      // console.log(user);
      this.LoggedIn= user ? true :  false ;
    })
  }
  onSaveData(){
    this.dataStorage1.storeData();
  }
  onFetchData(){
    this.dataStorage1.fetchLoading.next('heyy');
    this.dataStorage1.fetchData().subscribe();
  }
  logOut(){
    this.authService1.logOut();
  }
  ngOnDestroy(){
    this.subscription1.unsubscribe();
  }

}
