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
  generatedPlaylist:PlaylistData;
  mood:string;
  showResults:boolean;

  constructor(private spotifyService:SpotifyService) { }

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
    for(var i=0; i<20; i++){
      this.generatedPlaylist.tracks.push(new TrackData(this.library[i]));
      console.log(this.library[i]);
    }
    this.showResults=true;
  }

  selectMood(value:string){
    console.log('select mood ' + value);
    this.mood = value;
    this.generatePlaylist();
  }
}

