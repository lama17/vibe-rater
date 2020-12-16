import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { PlaylistListComponent } from 'src/app/components/playlist-list/playlist-list.component';
import { PlaylistData } from 'src/app/data/playlist-data';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  playlists:PlaylistData[];
  playlist1:PlaylistData;
  playlist2:PlaylistData;

  playlist1url:string;
  playlist2url:string;
  urls:string[];

  errorPresent:boolean;
  errorMsg:string;

  displayResults:boolean;

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
    this.urls = [this.playlist1url, this.playlist2url];
    this.playlists = [this.playlist1, this.playlist2];
    this.displayResults = false;
    this.errorPresent = false;
    this.errorMsg = "An error occurred, please try again. ";
  }

  comparePlaylists(){
    console.log('compare playlists called');
    // check URLs are valid, parse playlist ID from url, get playlists and set playlist1 and playlist2 to playlist items.
    this.getPlaylists();

    // to do: inject mood algo and compare playlists.

  }

  getPlaylists(){
    this.errorPresent = false;
    this.urls = [this.playlist1url, this.playlist2url];

    // check if each URL is valid, then grab the playlist:
    this.urls.forEach(url => {
      let index = this.urls.indexOf(url)
      if(this.isValidURL(url, index+1) == false){
        this.errorPresent = true;
        return;
      };

      // parse ID
      let id = this.parseID(url, index);

      // get playlists from ID
      this.spotifyService.getPlaylist(id).then(data => {
        if(index == 0){
          this.playlist1 = data;
        }else if(index ==1){
          this.playlist2 = data;
        }
      });
    });
    this.showResults();
  }

  showResults():void{
    this.displayResults = true;
    return;
  }

  isValidURL(url:string, n:number):boolean{
    // checks if the inputted URL is valid. returns true if url is valid and playlist ID is extractable.

    // CHECKS IF URL IS EMPTY
    if(url == null){
      this.errorMsg = "Please enter two valid URLs.";
      console.log(this.errorMsg);
      this.errorPresent = true;
      return false;
    }

    // CHECKS IF URL IS VALID SPOTIFY PLAYLIST URLS
    if(!url.includes('spotify.com') || !url.includes('playlist')){
        this.errorMsg = "One or both of your URLS is not a valid Spotify playlist link, please try again.";
        console.log(this.errorMsg);
        this.errorPresent = true;
        return false;
      }  
    }

  parseID(url:string, index:number):string{
    // PARSING PLAYLIST ID
    let split = url.split('playlist/')[1];
    // regex pattern to grab only the ID (not any ? or = or other params that may appear after id)
    let pattern = new RegExp('[a-zA-Z0-9]+');
    let matches = split.match(pattern);
    // (should be) playlist ID that we can use to grab playlist with SpotifyService
    let id = matches[0];
    return id;
  }

}
