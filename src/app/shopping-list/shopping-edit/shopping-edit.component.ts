import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(
    private slService: ShoppingListService
  ) { }

  ngOnInit(): void {}

  onIngredientAdd(ingName: string,  ingAmount: number){
    this.slService.onIngredientAdded(new Ingredient(ingName, ingAmount));
  }
}
