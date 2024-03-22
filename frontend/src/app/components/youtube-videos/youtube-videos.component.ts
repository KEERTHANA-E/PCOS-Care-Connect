import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-youtube-videos',
  templateUrl: './youtube-videos.component.html',
  styleUrls: ['./youtube-videos.component.css'],
})
export class YoutubeVideosComponent {
  videoItems: any[] | undefined;
  loading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getVideos();
  }
  getVideos(): void {
    const apiUrl =
      'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLGJ2sPspK2dxtkg8CdzwEHsvpXZTJ1a4_&maxResults=21&key=AIzaSyBm7ZA4eNeK34WqaKSDPsfCsssw37JHEdY';

    this.http.get<any>(apiUrl).subscribe(
      (data) => {
        this.videoItems = data.items;
        this.loading = false;
      },
      (err) => {
        console.error('Error fetching videos:', err);
        this.loading = false;
      }
    );
  }
}
