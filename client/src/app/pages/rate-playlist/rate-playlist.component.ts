import { Component, OnInit } from '@angular/core';
import { PlaylistData } from 'src/app/data/playlist-data';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-rate-playlist',
  templateUrl: './rate-playlist.component.html',
  styleUrls: ['./rate-playlist.component.css']
})
export class RatePlaylistComponent implements OnInit {
	playlists:PlaylistData[];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    //TODO: inject spotifyService and use it to get the album data and the tracks for the album
    this.spotifyService.getMyPlaylists().then(data => {
      this.playlists = data;
      console.log(this.playlists)
    });
  }

};
