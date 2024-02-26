import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-media-display',
  templateUrl: './media-display.component.html',
  styleUrls: ['./media-display.component.css'],
})
export class MediaDisplayComponent {
  @Input() mediaList: any[] = [];
}
