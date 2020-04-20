import { Component, OnInit, ViewChild, OnDestroy, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListServie: ShoppingListService,
              private store: Store<{shoppingList:{ ingredients: Ingredient[] }}>) { }

  ngOnInit() {
    this.subscription = this.shoppingListServie.startedEditing.subscribe((index: number) => {
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
    const newIngredient: Ingredient = new Ingredient(f.value.name, f.value.amount);
    if (this.editMode) {
      this.shoppingListServie.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      // this.shoppingListServie.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
    }
    this.editMode = false;
    this.slForm.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListServie.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

}
