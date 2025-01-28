import { Shopper } from "./shopper.model";
import { ShoppingListItem } from "./shoppingListItem";

export interface ShoppingList {
    id: number,
    shopper: Shopper,
    items: ShoppingListItem[]  
}