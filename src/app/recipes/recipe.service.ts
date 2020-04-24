
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'A Test Recipe', 
    //         'This is simply a test',
    //         'https://tse1.mm.bing.net/th?id=OIP.ofMnTpwMxKoVWALjgJrhhAHaHa&pid=Api&P=0&w=300&h=300', 
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('French Fries', 20)
    //         ]),
    //     new Recipe(
    //         'Another Test Recipe', 
    //         'This is simply a test',
    //         'https://tse1.mm.bing.net/th?id=OIP.ofMnTpwMxKoVWALjgJrhhAHaHa&pid=Api&P=0&w=300&h=300', 
    //         [
    //             new Ingredient('Buns', 2),
    //             new Ingredient('Meat', 1)
    //         ]),
    // ];
    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService, 
                private store: Store<fromShoppingList.AppState>) {}

    getRecipe(id: number): Recipe {
        return this.recipes[id];
    }

    getRecipes() {
        return this.recipes.slice();
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        // this.shoppingListService.addIngredients(ingredients)
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    };

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(id: number) {
      this.recipes.splice(id, 1);
      this.recipesChanged.next(this.recipes.slice())
    }

}
