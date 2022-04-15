import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{

  recipes!: Recipe[];
  subscription !: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log('recipe-list: ngOnInit called');

    this.subscription =  this.recipeService.recipeChanged.subscribe(
      (changedRecipes: Recipe[]) => {
        this.recipes = changedRecipes;
        console.log('recipe-list: recipe changed');
        console.log(this.recipes);
      }
    )

    this.recipes = this.recipeService.getRecipes();
    console.log('recipe-list: recipes-');
    console.log(this.recipes);
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
