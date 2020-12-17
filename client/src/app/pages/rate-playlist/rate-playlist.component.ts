import { Component, OnInit } from '@angular/core';
import { PlaylistData } from 'src/app/data/playlist-data';
import { TrackData } from 'src/app/data/track-data';
import { MoodAlgorithmService } from 'src/app/services/mood-algorithm.service';
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
  selectedPlaylistTracks:TrackData[]

  constructor(private spotifyService: SpotifyService, private moodService: MoodAlgorithmService) { }

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
    //this.moodService.ratePlaylist(this.selectedPlaylist);
   // this.moodService.getAudioFeaturesForTracks(this.selectedPlaylist.id);
    this.moodService.ratePlaylist(this.selectedPlaylist);
    this.moodService.comparePlaylists("37i9dQZF1DX0Yxoavh5qJV", "3dELPcYpgHlXjUxpIQ6LE5");
    this.moodService.buildPlaylist("Sad");
  }

};
