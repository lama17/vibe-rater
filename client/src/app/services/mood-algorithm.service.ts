import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlaylistListComponent } from '../components/playlist-list/playlist-list.component';
import { PlaylistData } from '../data/playlist-data';
import { TrackData } from '../data/track-data';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})


export class MoodAlgorithmService {
  static moods = ['happy', 'sad', 'energetic', 'calm'];
  trackList: TrackData[];
  //featuresList = [];


  constructor(private spotifyService: SpotifyService) {

  }

  // PUBLIC FUNCTIONS - THESE 3 FUNCTIONS ARE THE ONLY ONES THAT SHOULD BE CALLED OUTSIDE THIS CLASS
  async ratePlaylist(playlist: PlaylistData): Promise<any> {
    // given a playlist, rate the playlist by its moods and return an object of its rankings. for example: [{love: 40}, {happy: 20}, {sad: 20}]
    let moodList = await this.getAudioFeaturesForTracks(playlist.id);

    var energy = 0;
    var sadness = 0;
    var calmness = 0;
    var happiness = 0;

    for (var i = 0; i < moodList.length; i++) {
      if (moodList[i].mood == "Energetic") {
        energy++;
      }
      else if (moodList[i].mood == "Sad") {
        sadness++;
      }
      else if (moodList[i].mood == "Calm") {
        calmness++;
      }
      else {
        happiness++;
      }
    }
    var results =
    {
      energetic: energy,
      sad: sadness,
      calm: calmness,
      happy: happiness
    }
    console.log("rate playlists called");
    console.log(results);
    return results;
  }

  async buildPlaylist(vibe: string): Promise<any> {
    // given a list of songs (library) and a mood (mood), return a playlist that contains tracks that match the mood. 
    // return list 

    let p = await this.spotifyService.getMyLibrary();
    let idList = [];

    for (var i of p) {
      idList.push(i.id);
    }

    let data = await this.spotifyService.getAudioFeaturesForMultipleTracks(idList);
    var f = [];
    let mood = "";
    for (let i = 0; i < data.length; i++) {



      if (data[i].energy <= .49) 
      {
        if (data[i].valence <= .2 || data[i].acousticness >= .7 || data[i].energy <= .3 || data[i].loudness <= -15 || data[i].instrumentalness >= 40) {
          mood = "Calm";
        }
        else
        {
        mood = "Sad";
        }
      
      }
      else {
        if (data[i].valence > .49) {
          if (data[i].acousticness > .9) {
            mood = "Happy"
          }
          mood = "Energetic"
        }
        if (data[i].energy > .8) {
          if (data[i].acousticness <= .9) {
            mood = "Energetic"
          }
          mood = "Happy"
        }
        //mood = "Happy"
      }

      var trck =
      {
        id: data[i].id,
        mood: mood
      }

      f.push(trck);
    }

    let final = [];

    let newArray = [];

    for (let i = 0; i < f.length; i++) {
      newArray.push(f[i].id);
    }

    let trackingTracks = await this.spotifyService.getSeveralTracks(newArray);

    for (let i = 0; i < f.length; i++) {
      if (f[i].mood == vibe) {
        final.push(trackingTracks[i]);
      }
    }

    console.log("Build Playlist called:");
    console.log(f);
    console.log(final);

    return final;
  }

  async comparePlaylists(playlist1: string, playlist2: string): Promise<any> {
    // given 2 playlists, rate each playlist using the ratePlaylist funciton, then return an object containing an average of the two playlists' rankings.

    let p1 = await this.spotifyService.getPlaylist(playlist1);
    let p2 = await this.spotifyService.getPlaylist(playlist2);

    let p1Ident = await this.ratePlaylist(p1);
    let p2Ident = await this.ratePlaylist(p2);

    var energyAvg = (p1Ident.energetic + p2Ident.energetic) / 2;
    var sadAvg = (p1Ident.sad + p2Ident.sad) / 2;
    var calmAvg = (p1Ident.calm + p2Ident.calm) / 2;
    var happyAvg = (p1Ident.happy + p2Ident.happy) / 2;

    var results =
    {
      energetic: energyAvg,
      sad: sadAvg,
      calm: calmAvg,
      happy: happyAvg
    }
    console.log("comparePlaylistResults: ")
    console.log(results);
    return results;
  }


  async getAudioFeaturesForTracks(playlistId: string): Promise<any> {
    // given a list of tracks, get the IDs and call getAudioFeaturesforMultipleTracks() from spotifyService and returns an array of track-feature items.
    let idList = [];
    var mytracklist = await this.spotifyService.getTracksFromPlaylist(playlistId);

    //console.log(mytracklist);
    for (var t of mytracklist) {
      idList.push(t.id);
    }
    let data = await this.spotifyService.getAudioFeaturesForMultipleTracks(idList);
    var f = [];
    let mood = "";
    for (var i = 0; i < data.length; i++) {
      
      
      if (data[i].energy <= .49) 
      {
        if (data[i].valence <= .3 || data[i].acousticness >= .7 || data[i].energy <= .3 || data[i].loudness <= -15 || data[i].instrumentalness >= 40) {
          mood = "Calm";
        }
        else
        {
        mood = "Sad";
        }
      }

      else {
        if (data[i].valence > .49) {
          if (data[i].acousticness > .9) {
            mood = "Happy"
          }
          mood = "Energetic"
        }
        if (data[i].energy > .8) {
          if (data[i].acousticness <= .9) {
            mood = "Energetic"
          }
          mood = "Happy"
        }
        //mood = "Happy"
      }

      var trck =
      {
        id: data[i].id,
        mood: mood
      }

      f.push(trck);

      //  f.push(trck);
    }
    return f;
  }
}
