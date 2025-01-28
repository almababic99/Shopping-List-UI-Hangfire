import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.css',
  standalone: false
})
export class EditItemComponent implements OnInit {
  item: Item = {  // item object
    id: 0,
    name: '',
    quantity: 0
  };

  constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {   // The ngOnInit lifecycle hook runs when the component is initialized (before it is showed on screen)
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');  // getting id from url
      if (idParam) {
        this.itemService.getItemById(+idParam).subscribe({   // + converts string to number
          next: (item) => this.item = item  // using getItemById we get the item object from backend with its id and assign it to component's item object (before it is edited)
        })
      } 
      else {
        console.error('An error occured.');
      }
    });
  }

  onSubmit() {
    this.itemService.editItem(this.item).subscribe({   
      // once we submit the form component's item object name is changed automatically because of two-way binding in edit-item.component.html 
      // (the name of an item is now  the name that is typed in form, and not the name that was in database before for the item with that id)
      // the editItem is now called with this edited item
      next: () => {
        this.router.navigate(['/items'])   // navigating back to items after editing item
      },
      error: (error) => {
        console.error('Error editing item', error);
      },
    });
  }
}
