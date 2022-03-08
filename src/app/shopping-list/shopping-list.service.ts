import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/Ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService{

  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomato', 10)
  ];

  getIngredients(): Ingredient[]{
    return this.ingredients.slice();
  }

  onIngredientAdded(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  onIngredientsAdded(newIngredients: Ingredient[]){
    this.ingredients.push(...newIngredients);
    this.ingredientsChanged.emit(this.ingredients.slice())
  }

}