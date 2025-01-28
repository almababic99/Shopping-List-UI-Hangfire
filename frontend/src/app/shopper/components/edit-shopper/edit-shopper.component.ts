import { Component, OnInit } from '@angular/core';
import { Shopper } from '../../models/shopper.model';
import { ShopperService } from '../../services/shopper.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-shopper',
  templateUrl: './edit-shopper.component.html',
  styleUrl: './edit-shopper.component.css',
  standalone: false
})
export class EditShopperComponent implements OnInit {
  shopper: Shopper = {   // shopper object
    id: 0,
    name: ''
  };

  constructor(private shopperService: ShopperService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {   // The ngOnInit lifecycle hook runs when the component is initialized (before it is showed on screen)
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');  // getting id from url
      if (idParam) {
        this.shopperService.getShopperById(+idParam).subscribe({   // + converts string to number
          next: (shopper) => this.shopper = shopper  // using getShopperById we get the shopper object from backend with its id and assign it to component's shopper object (before it is edited)
        })
      } 
      else {
        console.error('An error occured.');
      }
    });
  }

  onSubmit() {
    this.shopperService.editShopper(this.shopper).subscribe({   
      // once we submit the form component's shopper object name is changed automatically because of two-way binding in edit-shopper.component.html 
      // (the name of shopper is now  the name that is typed in form, and not the name that was in database before for the shopper with that id)
      // the editShopper is now called with this edited shopper
      next: () => {
        this.router.navigate(['/shoppers'])   // navigating back to shoppers after editing shopper
      },
      error: (error) => {
        console.error('Error editing shopper', error);
      },
    });
  }
}
