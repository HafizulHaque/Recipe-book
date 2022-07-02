import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ComponentFactoryResolver, Injectable } from "@angular/core";
import { tap } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

const API_BASE_URL = 'http://localhost:3000/recipes';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ){ }

  async storeRecipes(){
    //all recipes to be there in db
    let recipes: Recipe[] = this.recipeService.getRecipes();

    this.http.get<Recipe[]>(`${API_BASE_URL}`).subscribe(res => {
      for (let recipe of res) {
        this.http.delete<Recipe>(`${API_BASE_URL}/${recipe.id}`).subscribe(response => {
          console.log('deleted');
        });
      }
      for(let recipe of recipes){
        this.http.post<Recipe>(API_BASE_URL, recipe).subscribe(res => {
          console.log(res);
        })
      }
    })
  }

  fetchRecipes(){
    return this.http.get<Recipe[]>(API_BASE_URL).pipe(tap(recipes => this.recipeService.setRecipes(recipes)));
  }

}