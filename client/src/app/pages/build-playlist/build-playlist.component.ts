import { Component, OnInit } from '@angular/core';
import { PlaylistData } from 'src/app/data/playlist-data';
import { TrackData } from 'src/app/data/track-data';
import { MoodAlgorithmService } from 'src/app/services/mood-algorithm.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-build-playlist',
  templateUrl: './build-playlist.component.html',
  styleUrls: ['./build-playlist.component.css']
})
export class BuildPlaylistComponent implements OnInit {
  library:TrackData[];
  generatedPlaylist:TrackData[];
  mood:string;
  showResults:boolean;

  constructor(private spotifyService:SpotifyService, private moodService:MoodAlgorithmService) { }

  ngOnInit() {
    this.showResults=false;
    this.spotifyService.getMyLibrary().then(data => {
      this.library = data;
      console.log('first 50 saved songs');
      console.log(this.library);
    });

  }
  
  //this doesn't work
  generatePlaylist(){
    this.moodService.buildPlaylist(this.mood).then(data=>{
      this.generatedPlaylist = data;
    });
    this.showResults = true;
    return;
  }

  selectMood(value:string){
    console.log('select mood ' + value);
    this.mood = value;
    this.generatePlaylist();
  }
}

