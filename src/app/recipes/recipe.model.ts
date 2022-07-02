import { Ingredient } from "../shared/Ingredient.model";

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  public id ?: number;

  constructor(name: string, desc: string, imgPath: string, ingredients: Ingredient[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = imgPath;
    this.ingredients = ingredients;
  }
}