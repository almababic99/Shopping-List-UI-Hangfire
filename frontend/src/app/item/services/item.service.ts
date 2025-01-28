import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'https://localhost:7092/api/item';  // API url

  constructor(private http: HttpClient) { } // This is the constructor of the ItemService class. It injects an instance of the HttpClient into the service.

  getItems(): Observable<Item[]> {  // Fetching the list of items. It returns an Observable<Item[]>, meaning it returns an observable that, when subscribed to, will emit an array of Item objects.
    return this.http.get<Item[]>(`${this.apiUrl}/items`); 
    // The http.get method is used to fetch data from the API. 
    // The generic <Item[]> ensures that the response is typed as an array of Item objects. 
    // The apiUrl is the URL for the backend service to get the item data. 
  }

  getItemById(id: number): Observable<Item> {   // Fetching item by id from backend
    return this.http.get<Item>(`${this.apiUrl}/item/${id}`)
  }

  addItem(item: Item)  {   // Adding item on backend
    return this.http.post(`${this.apiUrl}/addItem`, item);  // Sending http post request to backend with 'item' as parameter; addItem is returning Observable
  }

  deleteItem(id: number) {  // Deleting item on backend
    return this.http.delete(`${this.apiUrl}/deleteItem/${id}`);   // Sending http delete request to backend with 'id' as parameter: deleteItem is returning Observable
  }

  editItem(item: Item) {  // Editing item on backend
    return this.http.put(`${this.apiUrl}/editItem/${item.id}`, item)    // Sending http put request to backend with 'item' as parameter: editItem is returning Observable
  }
}
