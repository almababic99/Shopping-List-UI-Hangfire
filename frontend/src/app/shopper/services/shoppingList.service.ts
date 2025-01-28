import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingList } from '../models/shoppingList.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private apiUrl = 'https://localhost:7092/api/shoppingList';  // API url

  constructor(private http: HttpClient) {}

  getShoppingListsByShopperId(shopperId: number): Observable<ShoppingList[]> {   
    return this.http.get<ShoppingList[]>(
      `${this.apiUrl}/shoppingLists/${shopperId}`
    );
  }

  deleteShoppingList(id: number) {
    return this.http.delete(`${this.apiUrl}/deleteShoppingList/${id}`); // Sending http delete request to backend with 'id' as parameter
  }

  addShoppingList(shoppingList: ShoppingList) {  
    return this.http.post(`${this.apiUrl}/addShoppingList`, shoppingList).pipe(  // Sending http post request to backend with 'shoppingList' as parameter
      catchError((error) => {
        // If backend returns a 400 error (for 'One item can be found in maximum of 3 shopping lists')
        if (error.status === 400 || error.status === 500) {
          return throwError(() => new Error('Item is already in 3 shopping lists and one item can be found in maximum of 3 shopping lists'));  
        }
        return throwError(() => new Error('An error occured.'));
      })
    );
  }
}
