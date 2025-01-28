import { Component, OnInit } from '@angular/core';
import { Item } from '../../../item/models/item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingListService } from '../../services/shoppingList.service';
import { ItemService } from '../../../item/services/item.service';
import { ShoppingList } from '../../models/shoppingList.model';

@Component({
  selector: 'app-new-shopping-list',
  templateUrl: './new-shopping-list.component.html',
  styleUrl: './new-shopping-list.component.css',
  standalone: false,
})
export class NewShoppingListComponent implements OnInit {
  shopperId: number = 0;
  items: Item[] = []; // array of all items from db
  shoppingListItems: Item[] = []; // array of selected items for the shopping list
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shoppingListService: ShoppingListService,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id'); // getting id from url
      if (idParam) {
        this.shopperId = +idParam;
        this.getItems();   // calling getItems below to get all items from database
      } else {
        console.error('An error occured.');
      }
    });
  }

  getItems() {
    // get all items from database
    this.itemService.getItems().subscribe({
      next: (data) => (this.items = data),
      error: (error) => console.error(error),
    });
  }

  onItemChange(event: any, item: Item) {
    // items selection (checkbox)
    // Check if the item is already in the shoppingListItems array
    if (event.target.checked) {
      // Add the item to the selectedItems array if it isn't already there
      if (!this.shoppingListItems.find((i) => i.id === item.id)) {
        this.shoppingListItems.push(item);
      }
    } else {
      // Remove the item when unchecked
      this.shoppingListItems = this.shoppingListItems.filter((i) => i.id !== item.id); // Remove the item from shoppingListItems
    }
  }

  onSubmit() {
    if (this.shoppingListItems.length === 0) {
      this.errorMessage = 'Please select at least one item';
      return;
    }

    const shoppingList: ShoppingList = {
      id: 0, // id will be generated on backend
      shopper: {
        id: this.shopperId,
        name: '',
      },
      items: this.shoppingListItems.map((item) => ({
        id: 0, // id will be generated on backend
        item: item,
      })),
    };

    this.shoppingListService.addShoppingList(shoppingList).subscribe({
      next: () =>
        this.router.navigate([`/shoppers/shopping-lists/${this.shopperId}`]), // Navigate back to shopper's shopping lists
      error: (error) => {
        console.error(error);
        this.errorMessage = error;
      },
    });
  }
}
