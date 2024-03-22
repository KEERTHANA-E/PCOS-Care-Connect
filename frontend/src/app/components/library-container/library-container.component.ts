import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library-container',
  templateUrl: './library-container.component.html',
  styleUrls: ['./library-container.component.css'],
})
export class LibraryContainerComponent {
  constructor(private router: Router) {}
  redirectPage(data: any) {
    this.router.navigate([`/${data}`]);
  }
}
