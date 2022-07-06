import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { ComponentFactoryResolver, Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

// const API_BASE_URL = 'http://localhost:3000/recipes';
const API_BASE_URL = 'https://fir-angular-9492f-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ){ }

  async storeRecipes(){
    //all recipes to be there in db
    let recipes: Recipe[] = this.recipeService.getRecipes();

    // to store at localhost:3000
    // this.http.get<Recipe[]>(`${API_BASE_URL}`).subscribe(res => {
    //   for (let recipe of res) {
    //     this.http.delete<Recipe>(`${API_BASE_URL}/${recipe.id}`).subscribe(response => {
    //       console.log('deleted');
    //     });
    //   }
    //   for(let recipe of recipes){
    //     this.http.post<Recipe>(API_BASE_URL, recipe).subscribe(res => {
    //       console.log(res);
    //     })
    //   }
    // })
    // to store to firebase 
    this.http.put<Recipe[]>(API_BASE_URL, recipes).subscribe(res=>{
      console.log(res);
    })
  }

  fetchRecipes(){
    return this.authService.userSub.pipe(
      take(1),
      exhaustMap((user: User | null)=>{
        let userToken : string = user ? user.token : '';
        return this.http.get<Recipe[]>(API_BASE_URL);
      }),
      map(recipies => {
        let modifiedRecipies: Recipe[] = [];
        for(let recipe of recipies){
          modifiedRecipies.push({...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] })
        }
        return modifiedRecipies;
      }),
      tap(modRec => {
        this.recipeService.setRecipes(modRec)
      })
    )
  }

}