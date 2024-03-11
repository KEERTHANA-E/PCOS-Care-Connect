import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/shared/service/user.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css'],
})
export class WorkoutComponent {
  form: FormGroup | any;
  scheduleData: any;
  schedule: any[] = [
    {
      'day-1':
        'Cardio: 30 minutes of brisk walking \n Strength Training: 3 sets of 12 repetitions of squats and lunges',
      'day-2':
        'Cardio: 30 minutes of jogging \n Strength Training: 3 sets of 12 repetitions of push-ups and tricep dips',
      'day-3':
        'Cardio: 30 minutes of cycling \n Strength Training: 3 sets of 12 repetitions of deadlifts and bicep curls',
      'day-4':
        'Cardio: 30 minutes of swimming \n Strength Training: 3 sets of 12 repetitions of planks and mountain climbers',
      'day-5':
        'Cardio: 30 minutes of dancing \n Strength Training: 3 sets of 12 repetitions of shoulder presses and lateral raises',
      'day-6':
        'Cardio: 30 minutes of jumping rope \n Strength Training: 3 sets of 12 repetitions of calf raises and leg curls',
    },
    {
      'day-1':
        'Cardio: 20 minutes of jogging, Strength training: 3 sets of pushups, 3 sets of squats',
      'day-2':
        'Cardio: 30 minutes of cycling, Strength training: 3 sets of bicep curls, 3 sets of tricep dips',
      'day-3':
        'Cardio: 20 minutes of jumping jacks, Strength training: 3 sets of lunges, 3 sets of deadlifts',
      'day-4':
        'Cardio: 30 minutes of swimming, Strength training: 3 sets of shoulder press, 3 sets of lateral raises',
      'day-5':
        'Cardio: 20 minutes of high-intensity interval training, Strength training: 3 sets of chest flys, 3 sets of bent-over rows',
      'day-6':
        'Cardio: 30 minutes of dancing, Strength training: 3 sets of leg press, 3 sets of calf raises',
    },
    {
      'day-1': '1. Jogging for 30 minutes\n2. Squats for 3 sets of 12 reps',
      'day-2':
        '1. Jumping jacks for 3 sets of 30 reps\n2. Lunges for 3 sets of 12 reps',
      'day-3': '1. Cycling for 30 minutes\n2. Push-ups for 3 sets of 12 reps',
      'day-4':
        '1. High-intensity interval training for 20 minutes\n2. Planks for 3 sets of 30 seconds',
      'day-5': '1. Swimming for 30 minutes\n2. Deadlifts for 3 sets of 12 reps',
      'day-6': '1. Zumba for 30 minutes\n2. Bicep curls for 3 sets of 12 reps',
    },
    {
      'day-1': 'Cardio: 30 minutes of jogging, 20 minutes of cycling',
      'day-2': 'Strength training: 3 sets of squats, 3 sets of push-ups',
      'day-3': 'Cardio: 20 minutes of HIIT, 20 minutes of jump rope',
      'day-4': 'Strength training: 3 sets of deadlifts, 3 sets of bicep curls',
      'day-5': 'Cardio: 30 minutes of swimming, 20 minutes of stair climbing',
      'day-6': 'Strength training: 3 sets of lunges, 3 sets of tricep dips',
    },
    {
      'day-1':
        'Cardio: 30 minutes of brisk walking, Strength Training: 3 sets of squats with 15 repetitions each',
      'day-2':
        'Cardio: 20 minutes of cycling, Strength Training: 3 sets of bicep curls with 15 repetitions each',
      'day-3':
        'Cardio: 40 minutes of jogging, Strength Training: 3 sets of lunges with 15 repetitions each',
      'day-4':
        'Cardio: 30 minutes of swimming, Strength Training: 3 sets of tricep dips with 15 repetitions each',
      'day-5':
        'Cardio: 20 minutes of jump rope, Strength Training: 3 sets of shoulder presses with 15 repetitions each',
      'day-6':
        'Cardio: 40 minutes of dancing, Strength Training: 3 sets of deadlifts with 15 repetitions each',
    },
    {
      'day-1':
        'Cardio: 20 minutes of cycling, Strength Training: 3 sets of squats with dumbbells',
      'day-2':
        'Cardio: 20 minutes of jogging, Strength Training: 3 sets of bicep curls with resistance bands',
      'day-3':
        'Cardio: 20 minutes of jump rope, Strength Training: 3 sets of lunges with dumbbells',
      'day-4':
        'Cardio: 20 minutes of high-intensity interval training (HIIT), Strength Training: 3 sets of push-ups',
      'day-5':
        'Cardio: 20 minutes of swimming, Strength Training: 3 sets of tricep dips',
      'day-6':
        'Cardio: 20 minutes of stair climbing, Strength Training: 3 sets of deadlifts with barbell',
    },
    {
      'day-1':
        'Cardio: Running for 30 minutes\nStrength Training: Squats (3 sets of 12 reps)',
      'day-2':
        'Cardio: Cycling for 30 minutes\nStrength Training: Deadlifts (3 sets of 12 reps)',
      'day-3':
        'Cardio: Swimming for 30 minutes\nStrength Training: Lunges (3 sets of 12 reps)',
      'day-4':
        'Cardio: Jumping rope for 30 minutes\nStrength Training: Push-ups (3 sets of 12 reps)',
      'day-5':
        'Cardio: Dancing for 30 minutes\nStrength Training: Bicep curls (3 sets of 12 reps)',
      'day-6':
        'Cardio: Jumping jacks for 30 minutes\nStrength Training: Planks (3 sets of 12 reps)',
    },
    {
      'day-1':
        'Cardio: 20 minutes of brisk walking on the treadmill\nStrength Training: 3 sets of 10 reps of squats and lunges',
      'day-2':
        'Cardio: 30 minutes of cycling\nStrength Training: 3 sets of 10 reps of bicep curls and tricep dips',
      'day-3':
        'Cardio: 20 minutes of jogging\nStrength Training: 3 sets of 10 reps of deadlifts and shoulder presses',
      'day-4':
        'Cardio: 30 minutes of dancing\nStrength Training: 3 sets of 10 reps of leg press and calf raises',
      'day-5':
        'Cardio: 20 minutes of jump rope\nStrength Training: 3 sets of 10 reps of chest press and lat pulldowns',
      'day-6':
        'Cardio: 30 minutes of swimming\nStrength Training: 3 sets of 10 reps of planks and Russian twists',
    },
    {
      'day-1': 'Warm-up: Jogging for 10 minutes',
      'day-2': 'Warm-up: Jumping jacks for 5 minutes',
      'day-3': 'Warm-up: Skipping for 5 minutes',
      'day-4': 'Warm-up: High knees for 5 minutes',
      'day-5': 'Warm-up: Jump rope for 5 minutes',
      'day-6': 'Warm-up: Dancing for 10 minutes',
    },
    {
      'day-1':
        'Cardio: 30 minutes of jogging + Strength Training: 3 sets of 10 reps of squats and lunges',
      'day-2':
        'Cardio: 30 minutes of cycling + Strength Training: 3 sets of 10 reps of deadlifts and push-ups',
      'day-3':
        'Cardio: 30 minutes of high intensity interval training + Strength Training: 3 sets of 10 reps of bicep curls and tricep dips',
      'day-4':
        'Cardio: 30 minutes of dancing + Strength Training: 3 sets of 10 reps of shoulder presses and lateral raises',
      'day-5':
        'Cardio: 30 minutes of swimming + Strength Training: 3 sets of 10 reps of planks and mountain climbers',
      'day-6':
        'Cardio: 30 minutes of kickboxing + Strength Training: 3 sets of 10 reps of burpees and Russian twists',
    },
  ];
  constructor(private fb: FormBuilder, private userService: UserService) {}
  selectedWeek: any;
  displayRandomSchedule() {
    const randomIndex = Math.floor(Math.random() * this.schedule.length);
    console.log(randomIndex);
    this.selectedWeek = this.schedule[randomIndex];
  }
  ngOnInit() {
    this.form = this.fb.group({
      weight: [null, Validators.required],
      height: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.userService
        .workoutRecommend(this.form.value)
        .subscribe((recommendation) => {
          this.scheduleData = JSON.parse(recommendation.result);
          console.log('spliting' + this.scheduleData);
        });
    } else {
      alert('please enter a valid form details');
    }
  }
}
