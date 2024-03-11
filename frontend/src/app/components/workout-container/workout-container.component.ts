import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-container',
  templateUrl: './workout-container.component.html',
  styleUrls: ['./workout-container.component.css'],
})
export class WorkoutContainerComponent {
  constructor(private router: Router) {}
  redirectPage(data: any) {
    this.router.navigate([`/${data}`]);
  }
}
