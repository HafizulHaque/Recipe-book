import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  ingredients !: Ingredient[];
  ingChangedSub !: Subscription;


  constructor(
    private slService: ShoppingListService
  ) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.ingChangedSub = this.slService.ingredientsChanged.subscribe((changedIngredients: Ingredient[])=>{
      this.ingredients = changedIngredients;
    })
  }

  ngOnDestroy(): void {
    if(this.ingChangedSub) this.ingChangedSub.unsubscribe();
  }

  onEditItem(index: number){
    this.slService.startedEditing.next(index);
    console.log(`form shopping-list: event raised with index: ${index}`)
  }

}
