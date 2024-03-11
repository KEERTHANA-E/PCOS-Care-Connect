import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/shared/service/user.service';

@Component({
  selector: 'app-search-workout',
  templateUrl: './search-workout.component.html',
  styleUrls: ['./search-workout.component.css'],
})
export class SearchWorkoutComponent implements OnInit {
  workout: any;
  searchForm: FormGroup | any;
  constructor(private fb: FormBuilder, private userService: UserService) {}
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      query: this.fb.control(''),
    });
    this.searchForm.get('query').valueChanges.subscribe((val: any) => {
      this.test();
    });
    this.test();
  }

  test() {
    // const query = this.searchForm.get('query').value;
    // if (query == '') {
    //   this.userService.searchWorkout('chest').subscribe((recommendation) => {
    //     this.workout = recommendation;

    //   });
    // }
    // else{
    //   this.userService.searchWorkout(query).subscribe((recommendation) => {
    //     this.workout = recommendation;
    //   });
    // }
  }
}
