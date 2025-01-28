import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shopper } from '../models/shopper.model';

@Injectable({
  providedIn: 'root',
})
export class ShopperService {
  private apiUrl = 'https://localhost:7092/api/shopper'; // API url

  constructor(private http: HttpClient) {} // This is the constructor of the ShopperService class. It injects an instance of the HttpClient into the service.

  getShoppers(): Observable<Shopper[]> {
    // Fetching the list of shoppers. It returns an Observable<Shopper[]>, meaning it returns an observable that, when subscribed to, will emit an array of Shopper objects.
    return this.http.get<Shopper[]>(`${this.apiUrl}/shoppers`);
    // The http.get method is used to fetch data from the API.
    // The generic <Shopper[]> ensures that the response is typed as an array of Shopper objects.
    // The apiUrl is the URL for the backend service to get the shopper data.
  }

  getShopperById(id: number): Observable<Shopper> {
    // Fetching shopper by id from backend
    return this.http.get<Shopper>(`${this.apiUrl}/shopper/${id}`);
  }

  addShopper(shopper: Shopper) {
    // Adding shopper on backend
    return this.http.post(`${this.apiUrl}/addShopper`, shopper); // Sending http post request to backend with 'shopper' as parameter; addShopper is returning Observable
  }

  deleteShopper(id: number) {
    // Deleting shopper on backend
    return this.http.delete(`${this.apiUrl}/deleteShopper/${id}`); // Sending http delete request to backend with 'id' as parameter: deleteShopper is returning Observable
  }

  editShopper(shopper: Shopper) {
    // Editing shopper on backend
    return this.http.put(`${this.apiUrl}/editShopper/${shopper.id}`, shopper); // Sending http put request to backend with 'shopper' as parameter: editShopper is returning Observable
  }
}
