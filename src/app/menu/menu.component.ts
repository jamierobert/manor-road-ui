import { Component, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import { MenuService } from '../menu.service';
import { DropdownComponent } from "../dropdown/dropdown.component";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public menu = [];
  public subTotals = new Map();
  public selectedValue: number;
  public total = 0;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.sendGetRequest().subscribe((data: any[])=>{
        console.log("Received menu data:");
        console.log(data);
        this.menu = data;
      })
  }

  getSelectedItem(i,j){
    return this.menu[i].items[j];

  }
  

  changeAction(i, j, k) {

    this.selectedValue = i;

    var item = this.getSelectedItem(i,j);
    item.count = k;
    this.subTotals.set(item.name, item.price * k);

    this.total = 0;
    const iterator = this.subTotals;
    for (const [key, value] of this.subTotals) {
      this.total += value;
    }
    console.log("Total " + this.total);
  }
}
