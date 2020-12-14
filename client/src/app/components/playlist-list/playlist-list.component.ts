import { Component, OnInit, Input } from '@angular/core';
import { PlaylistData } from 'src/app/data/playlist-data';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent implements OnInit {
  @Input() playlists:PlaylistData[];
  selectedPlaylist:PlaylistData;
  showResults:boolean;

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
    this.showResults=false;
  }

  selectPlaylist(playlist:PlaylistData) {
    console.log(playlist.id + 'PLAYLIST ID');
    console.log(playlist.tracks);
    console.log(playlist.name);
    this.selectedPlaylist = playlist;
    this.showResults=true;
  }

}
