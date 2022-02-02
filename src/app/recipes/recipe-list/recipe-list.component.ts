import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe(
      'A test Recipe',
      'This is simply a test maybe',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'
    ),
    new Recipe(
      'Second Recipe of the day',
      'This is really awesome, spicy and juicy',
      'https://cdn.pixabay.com/photo/2021/12/30/11/33/italian-cuisine-6903774_960_720.jpg'
    ),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
