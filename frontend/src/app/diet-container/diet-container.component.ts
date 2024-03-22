import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diet-container',
  templateUrl: './diet-container.component.html',
  styleUrls: ['./diet-container.component.css'],
})
export class DietContainerComponent {
  constructor(private router: Router) {}
  redirectPage(data: any) {
    this.router.navigate([`/${data}`]);
  }
}
