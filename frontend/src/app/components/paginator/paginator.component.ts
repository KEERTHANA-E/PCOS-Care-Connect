import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 4;
  @Output() pageEvent = new EventEmitter<any>();
  // pageEvent = $event
  onPageChange(event: any) {
    this.pageEvent.emit(event);
  }
}
