import { Component, OnInit } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { PlaylistData } from 'src/app/data/playlist-data';
import { TrackData } from 'src/app/data/track-data';
import { TrackFeature } from 'src/app/data/track-feature';
import { MoodAlgorithmService } from 'src/app/services/mood-algorithm.service';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-rate-playlist',
  templateUrl: './rate-playlist.component.html',
  styleUrls: ['./rate-playlist.component.css']
})
export class RatePlaylistComponent implements OnInit {
  playlists:PlaylistData[] = [];
  selectedPlaylist:PlaylistData;
  showResults:boolean;
  updateName:boolean;
  selectedPlaylistMoods;
  sortedSelectedPlaylistMoods:[any, any][];
  playlistMoods: TrackFeature[] = [];
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

    // empties and clear data from previous playlists
    this.total=0;
    this.playlistMoods=[];

    // gets total of songs in  playlist (without calling spotify api), to calculate percentages
    const gettotal = obj => Object.values(obj).reduce((a:number, b:number) => a + b);
    this.total = gettotal(this.selectedPlaylistMoods);

    // sorts moods to display them in order from highest -> lowest
    this.sortedSelectedPlaylistMoods = Object.entries(this.selectedPlaylistMoods).sort((a:any,b:any) => b[1]-a[1]);
    // creates trackfeature objects to be used for the thermometer
    this.sortedSelectedPlaylistMoods.forEach (item => {
      this.playlistMoods.push(new TrackFeature(item[0], (item[1] / this.total)));
    });

  }

};
