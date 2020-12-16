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
  selectedPlaylist:PlaylistData;
  showResults:boolean;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.showResults = false;
    this.spotifyService.getMyPlaylists().then(data => {
      this.playlists = data;
    });
  }

  selected(){
    console.log(this.selectedPlaylist.name);
  }

  ratePlaylist(){
    this.showResults=true;
  }

};
