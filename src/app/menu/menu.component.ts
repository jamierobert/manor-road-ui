import { Component, OnInit} from '@angular/core';
import { MenuService } from '../menu.service';

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
    this.menuService.sendGetRequest().subscribe((data: any[]) => {
        console.log('Received menu data:');
        console.log(data);
        this.menu = data;
      });
  }

  getSelectedItem(i, j){
    return this.menu[i].items[j];

  }

  changeAction(i, j, k) {

    this.selectedValue = i;

    const item = this.getSelectedItem(i, j);
    item.count = k;
    this.subTotals.set(item.name, item.price * k);
    this.total = 0;
    for (const [_, value] of this.subTotals) {
      this.total += value;
    }
  }

  makePayment() {
    // Create an instance of the Stripe object with your publishable API key
    const stripe = Stripe('pk_test_YUcU8oYxWO4VwMdOgD9DyJrA');
    fetch('http://localhost:8080/checkout', {
      method: 'POST',
      body: JSON.stringify(this.menu),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((session) => {
        return stripe.redirectToCheckout({ sessionId: session.id });
      })
      .then((result) => {
        // If `redirectToCheckout` fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using `error.message`.
        if (result.error) {
          alert(result.error.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}
