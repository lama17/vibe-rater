import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { PlaylistListComponent } from 'src/app/components/playlist-list/playlist-list.component';
import { PlaylistData } from 'src/app/data/playlist-data';
import { MoodAlgorithmService } from 'src/app/services/mood-algorithm.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  playlists:PlaylistData[];
  playlist1id:string;
  playlist2id:string;
  playlist1:PlaylistData;
  playlist2:PlaylistData;
  playlist1url:string;
  playlist2url:string;
  urls:string[];

  comparePlaylistMoods;
  sortedComparePlaylistMoods;
  total;

  errorPresent:boolean;
  errorMsg:string;

  displayResults:boolean;

  constructor(private spotifyService:SpotifyService,  private moodService: MoodAlgorithmService) { }

  ngOnInit() {
    // this.playlist1url = 'https://open.spotify.com/playlist/0NCspsyf0OS4BsPgGhkQXM?si=Gl-7pzdxT0OQ6ok5dtwjuQ';
    // this.playlist2url = 'https://open.spotify.com/playlist/3FqVzPW4y0v6WhR63ps9RH?si=VfTV17Z9Qt2I8F96OOuJmA';
    this.urls = [this.playlist1url, this.playlist2url];
    this.playlists = [this.playlist1, this.playlist2];
    this.displayResults = false;
    this.errorPresent = false;
    this.errorMsg = "An error occurred, please try again. ";
  }

  async getPlaylists(){
    this.errorPresent = false;
    this.displayResults = false;
    this.urls = [this.playlist1url, this.playlist2url];

    // check if urls are the same
    if(this.playlist1url == this.playlist2url){
      this.errorPresent = true;
      this.errorMsg = "URLs cannot be identical, please try again."
      return;
    }

    // check if each URL is valid, then grab the playlist:
    this.urls.forEach(url => {
      let index = this.urls.indexOf(url)
      if(this.isValidURL(url, index+1) == false){
        this.errorPresent = true;
        return;
      };

      // parse ID
      let id = this.parseID(url, index);

      // set playlistID to parsed ID
      if(index == 0){
        this.playlist1id = id;
      }else if(index == 1){
        this.playlist2id = id;
      }
    });
    this.comparePlaylists();
  }

  async comparePlaylists(){
    // compare playlist tracks
    this.comparePlaylistMoods = await this.moodService.comparePlaylists(this.playlist1id, this.playlist2id);
    console.log(this.comparePlaylistMoods);

    // sorts moods to display them in order from highest -> lowest
    this.sortedComparePlaylistMoods = Object.entries(this.comparePlaylistMoods).sort((a:any,b:any) => b[1]-a[1]);

    // gets total of songs in  playlist (without calling spotify api), to calculate percentages
    const gettotal = obj => Object.values(obj).reduce((a:number, b:number) => a + b);
    this.total = gettotal(this.comparePlaylistMoods);
    this.showResults();

    // finally, get playlist names to show results
    this.playlist1 = await this.spotifyService.getPlaylist(this.playlist1id);
    this.playlist2 = await this.spotifyService.getPlaylist(this.playlist2id);
  }

  showResults():void{
    this.displayResults = true;
    return;
  }

  private isValidURL(url:string, n:number):boolean{
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

  private parseID(url:string, index:number):string{
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
