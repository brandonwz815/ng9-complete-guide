import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  private storeSub: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null; /* use != not !== to cover both cases of null and undefined */
      this.initForm();
    })
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // )
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, newRecipe)
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value)
      this.store.dispatch(new RecipeActions.UpdateRecipe({ index: this.id, recipe: this.recipeForm.value }));
    } else {
      // this.recipeService.addRecipe(newRecipe)
      // this.recipeService.addRecipe(this.recipeForm.value)
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value))
    }
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  onCancel() {
    // this.router.navigate(['recipes']);
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index)
  }

  private initForm() {
    let recipeName = '';
    let recipseImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      // const recipe: Recipe = this.recipeService.getRecipe(this.id);
      this.storeSub = this.store.select('recipes')
        .pipe(
          map(recipesState => {
            return recipesState.recipes.find((recipe, index) => {
              return this.id === index;
            })
          }))
        .subscribe(recipe => {
          recipeName = recipe.name;
          recipseImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe['ingredients']) {
            for (let ingredent of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  'name': new FormControl(ingredent.name, Validators.required),
                  'amount': new FormControl(ingredent.amount, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
                })
              );
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipseImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}
