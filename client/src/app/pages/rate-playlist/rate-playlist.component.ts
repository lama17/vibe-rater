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
  updateName:boolean;
  selectedPlaylistMoods;
  sortedSelectedPlaylistMoods:[any, any][];
  total;

  constructor(private spotifyService: SpotifyService, private moodService: MoodAlgorithmService) { }

  ngOnInit() {
    this.showResults = false;
    this.spotifyService.getMyPlaylists().then(data => {
      this.playlists = data;
    });
    this.selectedPlaylist = this.playlists[0];
  }

  selected(){
    this.updateName=false;
    this.showResults=false;

    // get mood rating for playlist
    console.log(this.selectedPlaylist.name);
    this.moodService.ratePlaylist(this.selectedPlaylist).then(data=>{
      this.selectedPlaylistMoods = data;
    });
  }

  display(){
    this.updateName=true;
    this.showResults=true;

    // sorts moods to display them in order from highest -> lowest
    this.sortedSelectedPlaylistMoods = Object.entries(this.selectedPlaylistMoods).sort((a:any,b:any) => b[1]-a[1]);

    // gets total of songs in  playlist (without calling spotify api), to calculate percentages
    const gettotal = obj => Object.values(obj).reduce((a:number, b:number) => a + b);
    this.total = gettotal(this.selectedPlaylistMoods);
  }

};
