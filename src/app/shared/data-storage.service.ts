import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, exhaustMap, take } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put<{ name: string }>(
            'https://ng9-complete-guide.firebaseio.com/recipes.json',
            recipes
        ).subscribe(responseData => {
            console.log(responseData)
        });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(
            'https://ng9-complete-guide.firebaseio.com/recipes.json'
        ).pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                })
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes)
            })
        )
    }
}