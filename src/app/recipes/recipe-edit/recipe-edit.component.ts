import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/Ingredient.model';
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
    private router: Router,
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
          ingName: [ingredient.name, Validators.required],
          ingAmount: [ingredient.amount,  [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]]
        }
        ))
      }
    }

    this.recipeForm = this.fb.group({
      name : [recipeName, [Validators.required]],
      desc : [recipeDesc, [Validators.required]],
      imgPath : [recipeImgPath, [Validators.required]],
      ingredients: this.recipeIngredients
    })

  }

  get recipeIngredientsCtrl() : FormArray {
    return <FormArray>this.recipeForm.get('ingredients');
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(this.fb.group({
      ingName: [null, [Validators.required]],
      ingAmount: [null, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]]
    }))
  }

  onSubmit(){

    let ings: Ingredient[] = this.recipeIngredientsCtrl.controls.map(
      (ingItemCtrl: any) => {
        return new Ingredient(ingItemCtrl.value.ingName, ingItemCtrl.value.ingAmount);
      }
    )

    let recipeData: Recipe = new Recipe(
      this.recipeForm.get('name')?.value,
      this.recipeForm.get('desc')?.value,
      this.recipeForm.get('imgPath')?.value,
      ings
    )

    console.log(recipeData);

    if(this.editMode){
      this.recipeService.updateRecipe(this.id, recipeData);
    }else{
      this.recipeService.addRecipe(recipeData);
    }
    this.onCancel();
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
