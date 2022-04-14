import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy{

  subscription !:Subscription;
  editMode: boolean = false;
  id !:number;
  editingRecipe !: Recipe;
  recipeIngredients !: FormArray;
  recipeForm !: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.subscription = this.route.params.subscribe((params: Params)=>{
      this.editMode = params['id'] != null;
      this.id = +params['id'];
      this.editingRecipe = this.recipeService.getRecipe(this.id);
    })

    this.initForm();

  }

  initForm(){

    this.recipeIngredients = this.fb.array([]);

    let recipeName: string = '';
    let recipeDesc: string = '';
    let recipeImgPath: string = '';

    if(this.editMode){

      recipeName = this.editingRecipe.name;
      recipeDesc = this.editingRecipe.description;
      recipeImgPath = this.editingRecipe.imagePath;

      for(let ingredient of this.editingRecipe.ingredients){
        this.recipeIngredients.push(this.fb.group({
          ingName: [ingredient.name],
          ingAmount: [ingredient.amount]
        }
        ))
      }
    }

    this.recipeForm = this.fb.group({
      name : [recipeName, []],
      desc : [recipeDesc, []],
      imgPath : [recipeImgPath, []],
      ingredients: this.recipeIngredients
    })

  }

  get recipeIngredientsCtrl() : FormArray {
    return <FormArray>this.recipeForm.get('ingredients');
  }

  onSubmit(){

  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
