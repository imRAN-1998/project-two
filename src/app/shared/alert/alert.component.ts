import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
// import {  } from 'protractor';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() message;
  @Output() output1 = new EventEmitter()
  constructor() { }
  close(){
    this.output1.emit('close');
  }
  ngOnInit(): void {
  }

}
