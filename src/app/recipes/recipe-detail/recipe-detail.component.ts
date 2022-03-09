import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  
  recipeItem!: Recipe;

  constructor(
    private recipeService: RecipeService,
    private slService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      const recipeId: number = +params['id'];
      this.recipeItem = this.recipeService.getRecipe(recipeId);
    })
  }

  onRecipeEdit(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  addIngredientsToList(){
    this.slService.onIngredientsAdded(this.recipeItem.ingredients);
    this.router.navigate(['shopping-list']);
  }


}
