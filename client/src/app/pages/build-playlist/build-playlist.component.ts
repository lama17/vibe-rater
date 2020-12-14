import { Component, OnInit } from '@angular/core';
import { PlaylistData } from 'src/app/data/playlist-data';
import { TrackData } from 'src/app/data/track-data';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-build-playlist',
  templateUrl: './build-playlist.component.html',
  styleUrls: ['./build-playlist.component.css']
})
export class BuildPlaylistComponent implements OnInit {
  library:TrackData[];

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {

    this.spotifyService.getMyLibrary().then(data => {
      this.library = data;
      console.log('first 50 saved songs');
      console.log(this.library);
    });
  }
}

