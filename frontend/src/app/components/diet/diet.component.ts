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
  breakfast: any;
  lunch:any;
  snacks:any;
  dinner:any;
  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.submitForm = this.fb.group({
      input_data: this.fb.group({
        Age: this.fb.control('30', [Validators.required]),
        Height: this.fb.control('175', [Validators.required]),
        Weight: this.fb.control('70', [Validators.required]),
        PhysicalActivityLevel: this.fb.control('', [Validators.required]),
      }),
      max_nutritional_values: this.fb.array([
        2000, 100, 13, 300, 2300, 325, 40, 40, 200,
      ]),
      ingredient_filter: this.fb.array(['chicken', 'rice']),
    });
  }
  calculateTDEE(age: number, weight: number, height: number, physicalActivityLevel: number): void {
    let tdee: number = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    tdee *= physicalActivityLevel;
    tdee -= 400;

    const fatGrams: number = weight;
    const proteinGrams: number = 1.4 * weight;
    const carbCalories: number = (0.5 * tdee);
    const carbGrams: number = carbCalories / 4;

    const BreakfastCal: number = 0.28 * tdee;
    const BreakfastFat: number = (1 / 3) * fatGrams;
    const BreakfastPro: number = (1 / 6) * proteinGrams;
    const BreakfastCarb: number = (1 / 3) * carbGrams;
    this.callUserService(BreakfastCal,BreakfastFat,BreakfastCarb,BreakfastPro,0);

    const LunchCal: number = Math.round(0.38 * tdee);
    const LunchFat: number = Math.round((1 / 3) * fatGrams);
    const LunchPro: number = Math.round((1 / 3) * proteinGrams);
    const LunchCarb: number = Math.round((1 / 3) * carbGrams);
    this.callUserService(LunchCal, LunchFat, LunchCarb, LunchPro,1);

    const SnackCal: number = Math.round(0.10 * tdee);
    const SnackFat: number = Math.round((1 / 6) * fatGrams);
    const SnackPro: number = Math.round((1 / 6) * proteinGrams);
    const SnackCarb: number = Math.round((1 / 6) * carbGrams);
    this.callUserService(SnackCal, SnackFat, SnackCarb, SnackPro,2);

    const DinnerCal: number = Math.round(0.28 * tdee);
    const DinnerFat: number = Math.round((1 / 6) * fatGrams);
    const DinnerPro: number = Math.round((1 / 3) * proteinGrams);
    const DinnerCarb: number = Math.round((1 / 6) * carbGrams);
    this.callUserService(DinnerCal, DinnerFat, DinnerCarb, DinnerPro,3);

    console.log("Breakfast Calories:", BreakfastCal);
    console.log("Breakfast Fat (g):", BreakfastFat);
    console.log("Breakfast Protein (g):", BreakfastPro);
    console.log("Breakfast Carbs (g):", BreakfastCarb);

    console.log("Lunch Calories:", LunchCal);
    console.log("Lunch Fat (g):", LunchFat);
    console.log("Lunch Protein (g):", LunchPro);
    console.log("Lunch Carbs (g):", LunchCarb);

    console.log("Snack Calories:", SnackCal);
    console.log("Snack Fat (g):", SnackFat);
    console.log("Snack Protein (g):", SnackPro);
    console.log("Snack Carbs (g):", SnackCarb);

    console.log("Dinner Calories:", DinnerCal);
    console.log("Dinner Fat (g):", DinnerFat);
    console.log("Dinner Protein (g):", DinnerPro);
    console.log("Dinner Carbs (g):", DinnerCarb);
}

  getRecommendation() {
    if (this.submitForm.valid) {
      const input_data = this.submitForm.get('input_data')?.value;
      console.log(input_data);
      this.calculateTDEE(input_data.Age, input_data.Weight, input_data.Height,input_data.PhysicalActivityLevel);
    } else {
      alert('Please enter valid form details.');
    }
  }
  callUserService(calories: any,fatContent: any,carbohydrateContent: any,proteinContent: any,type:number){
    const obj = {
      input_data: {
        Calories: calories,
        FatContent: fatContent,
        CarbohydrateContent: carbohydrateContent,
        ProteinContent: proteinContent,
      },
      max_nutritional_values: this.submitForm.get('max_nutritional_values')?.value,
      ingredient_filter: this.submitForm.get('ingredient_filter')?.value,
    };
    this.userService.dietRecommend(obj).subscribe((recommendation) => {
      console.log(recommendation);
      if(type==0){
        this.breakfast = recommendation;
      }
      else if(type==1){
        this.lunch=recommendation;
      }
      else if(type==2){
        this.snacks = recommendation;
      }
      else this.dinner = recommendation;
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
}
