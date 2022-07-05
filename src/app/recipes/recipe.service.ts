import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/Ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService{

  recipeChanged = new Subject<Recipe[]>();
  
  private recipes: Recipe[] = [
  ];


  constructor(
    private slService: ShoppingListService
  ){}

  getRecipes(): Recipe[]{
    console.log('recipe-service: getRecipes() called');
    console.log(this.recipes);
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]){
    for(let recipe of recipes){
      this.recipes.push(recipe);
    }
    this.recipeChanged.next(this.recipes.slice())
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addToShoppingList(ingredients: Ingredient[]){
    this.slService.onIngredientsAdded(ingredients)
  }

  addRecipe(newRecipe: Recipe){
    console.log('recipe-service: addRecipe() called');
    console.log(newRecipe);
    this.recipes.push(newRecipe);
    console.log('pushed');
    console.log(this.recipes);
    this.recipeChanged.next(this.recipes.slice());
    console.log('boradcasted: ');
  }
  
  updateRecipe(index: number, updatedRecipe: Recipe){
    console.log('recipe-service: updateRecipe() called');
    console.log(updatedRecipe);
    this.recipes[index] = updatedRecipe;
    this.recipeChanged.next(this.recipes.slice());
    console.log('after update');
    console.log(this.recipes);
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}