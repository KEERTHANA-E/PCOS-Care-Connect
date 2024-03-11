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
  recipes: any;
  constructor(private fb: FormBuilder, private userService: UserService) {}
  ngOnInit(): void {
    this.submitForm = this.fb.group({
      input_data: this.fb.group({
        Calories: this.fb.control('500', [Validators.required]),
        FatContent: this.fb.control('20', [Validators.required]),
        SaturatedFatContent: this.fb.control('8', [Validators.required]),
        CholesterolContent: this.fb.control('100', [Validators.required]),
        SodiumContent: this.fb.control('800', [Validators.required]),
        CarbohydrateContent: this.fb.control('70', [Validators.required]),
        FiberContent: this.fb.control('6', [Validators.required]),
        SugarContent: this.fb.control('25', [Validators.required]),
        ProteinContent: this.fb.control('30', [Validators.required]),
      }),
      max_nutritional_values: this.fb.array([
        2000, 100, 13, 300, 2300, 325, 40, 40, 200,
      ]),
      ingredient_filter: this.fb.array(['chicken', 'rice']),
    });
  }
  get maxNutritionalValues(): FormArray {
    return this.submitForm.get('max_nutritional_values') as FormArray;
  }

  get ingredientFilter(): FormArray {
    return this.submitForm.get('ingredient_filter') as FormArray;
  }
  parseIngredients(ingredientString: string): string[] {
    return ingredientString
      .substring(3, ingredientString.length - 3)
      .split('", "');
  }

  parseInstructions(instructionString: string): string[] {
    return instructionString
      .substring(3, instructionString.length - 3)
      .split('", "');
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
  parseArrayString(arrayString: string): string[] {
    // Check if the string starts with 'c(' and ends with ')'
    if (arrayString.startsWith('c(') && arrayString.endsWith(')')) {
      // Remove 'c(' from the start and ')' from the end of the string
      const cleanedString = arrayString.substring(2, arrayString.length - 1);
      // Split the cleaned string into an array based on ', ' delimiter
      return cleanedString.split(', ');
    } else {
      // If the string is not in the expected format, return an empty array
      return [];
    }
  }
  parseImageUrls(imageString: string): string[] {
    // Check if the string contains 'character(0)' or not
    if (imageString.includes('character(0)')) {
      // If 'character(0)' is present, return an empty array
      return [];
    } else if (imageString.startsWith('"')) {
      // If the string starts with a double quote, it's a single URL
      return [imageString.substring(1, imageString.length - 1)];
    } else {
      // Otherwise, it's a string representation of an array
      const cleanedString = imageString.replace(/c\(|\)|"/g, ''); // Remove 'c(', ')' and '"' characters
      return cleanedString.split(', '); // Split the cleaned string into an array of URLs
    }
  }

  // getRecommendation() {
  //   if (this.submitForm.valid) {
  //     console.log(this.submitForm.value);
  //     this.userService
  //       .dietRecommend(this.submitForm.value)
  //       .subscribe((recommendation) => {
  //         console.log(recommendation);
  //         this.recipes = recommendation[0];
  //       });
  //   } else {
  //     alert('please enter a valid form details');
  //   }
  // }
  getRecommendation() {
    if (this.submitForm.valid) {
      this.userService
        .dietRecommend(this.submitForm.value)
        .subscribe((recommendation) => {
          console.log(recommendation);
          this.recipes = recommendation;
          // this.recipes.forEach((recipe:any) => {
          //   recipe.images = this.parseImageUrls(recipe.images);
          // });
          console.log(this.recipes);
        });
    } else {
      alert('Please enter valid form details.');
    }
  }
}
