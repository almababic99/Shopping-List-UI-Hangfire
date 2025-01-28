import { Component, OnInit } from '@angular/core';
import { Item } from './models/item.model';
import { ItemService } from './services/item.service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
  standalone: false
})
export class ItemComponent implements OnInit {
  items: Item[] = []; // This array will store the list of items fetched from the API.

  message: string = ''; // error message

  constructor(private itemService: ItemService) {}
  
  ngOnInit() {
    this.getItems();  // calling the method below
  }

  getItems() {
    this.itemService.getItems().subscribe(  // The component subscribes to this observable to receive the item data. The subscription will trigger an HTTP request to fetch the list of items from the API.
      {
        next: (data) => {
          this.items = data; // Storing fetched items; The data (which is an array of items) is assigned to the items property of the component.
          console.log(data);
        },
        error: (error) => {
          console.error('Error fetching items', error);
        },
      } 
    );
  }

  deleteItem(id: number) {
    const confirmed = confirm(`Are you sure you want to delete the item?`);
    if (confirmed) {
      this.itemService.deleteItem(id).subscribe(  // The component subscribes to this observable to delete item; Calling deleteItem from item.service.ts
        {
          next: () => {
            this.items = this.items.filter(item => item.id !== id);   // Removing deleted item from the local items array
          },
          error: (error) => {
            console.error('Error deleting item', error);
            this.message = "Item is in a shopping list and it can't be deleted";  // error message
          }
        }
      );
    }
  }
}
