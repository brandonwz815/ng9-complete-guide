
import { EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 
    'https://tse1.mm.bing.net/th?id=OIP.ofMnTpwMxKoVWALjgJrhhAHaHa&pid=Api&P=0&w=300&h=300'),
    new Recipe('Another Test Recipe', 'This is simply a test', 
    'https://tse1.mm.bing.net/th?id=OIP.ofMnTpwMxKoVWALjgJrhhAHaHa&pid=Api&P=0&w=300&h=300'),
  ];

  getRecipes() {
      return this.recipes.slice();
  }

}
