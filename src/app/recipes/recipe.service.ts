import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/Ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{

  recipeChanged = new Subject<Recipe[]>();
  
  private recipes: Recipe[] = [
    new Recipe(
      'Yummy Raw Masala Briskit',
      'Spicy raw magic masala flavoured Briskit',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      [
        new Ingredient('Soft Beef', 4),
        new Ingredient('Spicy Hot Masala', 1),
        new Ingredient('Butter', 2)
      ]
    ),
    new Recipe(
      'Hot Spicyman Pizza',
      'This is really awesome, spicy and juicy pizza',
      'https://cdn.pixabay.com/photo/2021/12/30/11/33/italian-cuisine-6903774_960_720.jpg',
      [
        new Ingredient('Bun', 5),
        new Ingredient('Vegetables', 2),
        new Ingredient('Spicy Masala', 1)
      ]
    )
  ];


  constructor(
    private slService: ShoppingListService
  ){}

  getRecipes(): Recipe[]{
    console.log('recipe-service: getRecipes() called');
    console.log(this.recipes);
    return this.recipes.slice();
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