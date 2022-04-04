import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscription !: Subscription;
  ingredientForm !: FormGroup;

  editingMode: boolean = false;
  editedItemIndex!: number;
  editedItem !: Ingredient;

  constructor(
    private slService: ShoppingListService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.ingredientForm = this.fb.group({
      name: [null, [Validators.required]],
      amount: [0, [Validators.required, Validators.pattern("^[1-9][0-9]*$")]]
    })

    this.subscription = this.slService.startedEditing.subscribe(
      (index: number)=>{
        this.editedItemIndex = index;
        this.editingMode = true;
        this.editedItem = this.slService.getIngredient(index);
        console.log(`received broadcasted event for editing ingreditent: ${this.editedItem.name}`)
        this.ingredientForm.patchValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    )

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(){
    console.log(this.ingredientForm);
    const ingName = this.ingredientForm.get('name')?.value;
    const ingAmount = this.ingredientForm.get('amount')?.value;
    if(this.editingMode){
      this.slService.updateIngredient(this.editedItemIndex, new Ingredient(ingName, ingAmount));
    }else{
      this.slService.onIngredientAdded(new Ingredient(ingName, ingAmount));
    }
    this.editingMode = false;
    this.ingredientForm.reset();
  }

  onClear(){
    this.editingMode = false;
    this.ingredientForm.reset();
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }


}
