import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {

  @HostBinding('class.open') isOpen: boolean;

  constructor() {
    this.isOpen = false;
  }

  @HostListener('mouseenter') addClass(){
    this.isOpen = true;
  }

  @HostListener('mouseleave') removeClass(){
    this.isOpen = false;
  }

}
