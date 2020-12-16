import { Component, OnInit, Input } from '@angular/core';
import { PlaylistData } from 'src/app/data/playlist-data';
import { TrackData } from 'src/app/data/track-data';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent implements OnInit {
  @Input() playlists:PlaylistData[];
  selectedPlaylist:PlaylistData;
  selectedPlaylistTracks:TrackData[];
  showResults:boolean;

  constructor(private spotifyService:SpotifyService) {
  }

  ngOnInit() {
    this.showResults=false;
  }

  selectPlaylist(playlist:PlaylistData) {
    console.log(playlist.id + ' = PLAYLIST ID');
    console.log(playlist.tracks);
    console.log(playlist.name);

    this.selectedPlaylist = playlist;
    this.showResults=true;

    this.getTracksforPlaylist(this.selectedPlaylist.id);
  }

  getTracksforPlaylist(id:string){
    this.spotifyService.getTracksFromPlaylist(this.selectedPlaylist.id).then(data => {
      this.selectedPlaylistTracks = data.map(item => {
        return item;
      })
    });
  }
}
