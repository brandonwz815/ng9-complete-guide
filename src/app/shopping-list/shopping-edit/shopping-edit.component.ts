import { Component, OnInit, ViewChild, OnDestroy, } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListServie: ShoppingListService) {  }

  ngOnInit() {
    this.subscription = this.shoppingListServie.startedEditing.subscribe((index: number)=> {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingListServie.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddItem(f: NgForm) {
    this.shoppingListServie.addIngredient(new Ingredient(
      f.value.name,
      f.value.amount
    ))
  }

}
