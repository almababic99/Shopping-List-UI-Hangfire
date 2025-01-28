import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import { NewItemComponent } from './components/new-item/new-item.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { EditItemComponent } from './components/edit-item/edit-item.component';

@NgModule({
  declarations: [ItemComponent, NewItemComponent, EditItemComponent],
  imports: [CommonModule, AppRoutingModule, FormsModule],
})
export class ItemModule { }
