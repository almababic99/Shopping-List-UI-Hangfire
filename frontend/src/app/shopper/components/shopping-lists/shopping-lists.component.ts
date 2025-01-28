import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopperService } from '../../services/shopper.service';
import { Shopper } from '../../models/shopper.model';
import { ShoppingList } from '../../models/shoppingList.model';
import { ShoppingListService } from '../../services/shoppingList.service';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
  styleUrl: './shopping-lists.component.css',
  standalone: false
})
export class ShoppingListsComponent implements OnInit {
  shopper: Shopper = {   // shopper object
    id: 0,
    name: ''
  };

  shoppingLists: ShoppingList[] = [];

  constructor(private shopperService: ShopperService, private router: Router, private route: ActivatedRoute, private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');  // getting id from url
      if (idParam) {
        this.shopperService.getShopperById(+idParam).subscribe({   // + converts string to number
          next: (shopper) => {
            this.shopper = shopper;  // using getShopperById we get the shopper object from backend with its id and assign it to component's shopper object (before it is edited)
            this.getShoppingListsByShopperId(this.shopper.id);  // getting shopping lists for shopper by shopper id
          },
          error: (error) => {
            console.error('Error fetching shopping lists', error);
          }
        });
      } 
      else {
        console.error('An error occured.');
      }
    });
  }

  getShoppingListsByShopperId(shopperId: number) {   // getting shopping lists for shopper by shopper id
    this.shoppingListService.getShoppingListsByShopperId(shopperId).subscribe(
      {
        next: (data) => {
          this.shoppingLists = data;
        },
        error: (error) => {
          console.error('Error fetching shopping lists', error);
        },
      }
    );
  }

  deleteShoppingList(id: number) {
    const confirmed = confirm(`Are you sure you want to delete this shopping list?`);
    if (confirmed) {
      this.shoppingListService.deleteShoppingList(id).subscribe(  // The component subscribes to this observable to delete shopping list; Calling deleteShoppingList from shoppingList.service.ts
        {
          next: () => {
            this.shoppingLists = this.shoppingLists.filter(shoppingList => shoppingList.id !== id);   // Removing deleted shopping list from the local shopping lists array
          },
          error: (error) => {
            console.error('Error deleting shopping list', error);
          }
        }
      );
    }
  }
}
