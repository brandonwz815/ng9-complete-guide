import { Component, OnInit, ViewChild, } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('f', {static: false}) signupForm: NgForm;

  constructor(private shoppingListServie: ShoppingListService) {  }

  ngOnInit() {}

  onAddItem(f: NgForm) {
    this.shoppingListServie.addIngredient(new Ingredient(
      f.value.name,
      f.value.amount
    ))
  }

}
