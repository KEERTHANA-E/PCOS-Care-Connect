import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/shared/service/user.service';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.css'],
})
export class DietComponent implements OnInit {
  submitForm: FormGroup | any;
  constructor(private fb: FormBuilder, private userService: UserService) {}
  ngOnInit(): void {
    this.submitForm = this.fb.group({
      input_data: this.fb.group({
        Calories: this.fb.control('', [Validators.required]),
        FatContent: this.fb.control('', [Validators.required]),
        SaturatedFatContent: this.fb.control('', [Validators.required]),
        CholesterolContent: this.fb.control('', [Validators.required]),
        SodiumContent: this.fb.control('', [Validators.required]),
        CarbohydrateContent: this.fb.control('', [Validators.required]),
        FiberContent: this.fb.control('', [Validators.required]),
        SugarContent: this.fb.control('', [Validators.required]),
        ProteinContent: this.fb.control('', [Validators.required]),
      }),
      max_nutritional_values: this.fb.array([]),
      ingredient_filter: this.fb.array([]),
    });
  }
  get maxNutritionalValues(): FormArray {
    return this.submitForm.get('max_nutritional_values') as FormArray;
  }

  get ingredientFilter(): FormArray {
    return this.submitForm.get('ingredient_filter') as FormArray;
  }

  // Add controls for max_nutritional_values array
  addMaxNutritionalValue() {
    this.maxNutritionalValues.push(this.fb.control(''));
  }

  // Add controls for ingredient_filter array
  addIngredientFilter() {
    this.ingredientFilter.push(this.fb.control(''));
  }
  // Remove control from max_nutritional_values array
  removeMaxNutritionalValue(index: number) {
    this.maxNutritionalValues.removeAt(index);
  }

  // Remove control from ingredient_filter array
  removeIngredientFilter(index: number) {
    this.ingredientFilter.removeAt(index);
  }
  getRecommendation() {
    if (this.submitForm.valid) {
      console.log(this.submitForm.value);
    }
    else{
      alert('please enter a valid form details');
    }
  }
}
