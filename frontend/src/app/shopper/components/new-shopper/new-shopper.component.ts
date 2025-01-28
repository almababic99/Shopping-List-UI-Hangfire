import { Component } from '@angular/core';
import { ShopperService } from '../../services/shopper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-shopper',
  templateUrl: './new-shopper.component.html',
  styleUrl: './new-shopper.component.css',
  standalone: false,
})
export class NewShopperComponent {
  shopperName: string = '';

  message: string = ''; // error message

  constructor(private shopperService: ShopperService, private router: Router) {}

  onSubmit() {
    if (!this.shopperName) {
      return; // avoid submitting if the name is empty
    }

    const shopper = {
      id: 0,
      name: this.shopperName,
    };

    this.shopperService.addShopper(shopper).subscribe({
      next: () => {
        this.router.navigate(['/shoppers']); // navigating back to shoppers after adding shopper
      },
      error: (error) => {
        console.error('Error adding shopper', error);
        this.message =
          'Error adding shopper. Shopper with the same name already exists.'; // error message
      },
    });
  }
}
