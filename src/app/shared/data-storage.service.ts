import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    error = new Subject();

    constructor(private http: HttpClient,
        private recipeService: RecipeService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put<{ name: string }>(
            'https://ng9-course-recipe-book.firebaseio.com/recipes.json',
            recipes
        ).subscribe(responseData => {
            console.log(responseData)
        });
    }

    fetchRecipes() {
        this.http.get<Recipe[]>(
            'https://ng9-course-recipe-book.firebaseio.com/recipes.json'
        )
        .subscribe(recipes => {
            this.recipeService.setRecipes(recipes);
        })
    }
}