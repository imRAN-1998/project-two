import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  isopen:boolean=false;
  constructor() { }
  @HostListener('click') func1(){
    this.isopen = !this.isopen;
  }

}
