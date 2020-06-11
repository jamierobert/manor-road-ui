import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  public selectedValue: number = 0;

  constructor() { }

  ngOnInit(): void {
  }
  changeAction(i) {
    this.selectedValue = i;
  }
}
