import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/Ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
  
  recipes: Recipe[] = [
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
    ),
  ];

  recipeSelectedEvent = new EventEmitter<Recipe>();

  constructor(private slService: ShoppingListService){}

  getRecipes(): Recipe[]{
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addToShoppingList(ingredients: Ingredient[]){
    this.slService.onIngredientsAdded(ingredients)
  }
}