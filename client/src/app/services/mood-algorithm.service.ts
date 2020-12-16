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
  static moods = ['happy', 'sad', 'energetic', 'calm']

  constructor(private spotifyService: SpotifyService) { }

  // PUBLIC FUNCTIONS - THESE 3 FUNCTIONS ARE THE ONLY ONES THAT SHOULD BE CALLED OUTSIDE THIS CLASS
  ratePlaylist(playlist: PlaylistData): Object {
    // given a playlist, rate the playlist by its moods and return an object of its rankings. for example: [{love: 40}, {happy: 20}, {sad: 20}]
    this.getAudioFeaturesForTracks(this.getTracksFromPlaylist(playlist.id));
    return;
  }

  buildPlaylist(mood: string, library: TrackData[]): PlaylistData {
    // given a list of songs (library) and a mood (mood), return a playlist that contains tracks that match the mood. 
    return;
  }

  comparePlaylists(playlist1: PlaylistData, playlist2: PlaylistData): Object {
    // given 2 playlists, rate each playlist using the ratePlaylist funciton, then return an object containing an average of the two playlists' rankings.
    return;
  }

  // getMood(trackAudioFeatures:string[])
  // {
  //   let mood = "";
  // }

  // PRIVATE FUNCTIONS - SHOULD ONLY BE ACCESSIBLE BY OTHER FUNCTIONS IN THIS CLASS - make them public to test them tho //
  private getTracksFromPlaylist(playlistId:string):any{
    this.spotifyService.getTracksFromPlaylist(playlistId).then(data => {
      console.log(data);
      return data;
    });
  }
  
  getAudioFeaturesForTracks(tracks: TrackData[]): any {
    // given a list of tracks, get the IDs and call getAudioFeaturesforMultipleTracks() from spotifyService and returns an array of track-feature items.
    let idList = [];
    tracks.forEach(track => {
      idList.push(track.id);
    });
    this.spotifyService.getAudioFeaturesForMultipleTracks(idList).then(data => {
      console.log('mood-algorithm.ts called getAudioFeatresForTracks')
      console.log(data)
      // map this data onto an object, then return it

      var featuresArray = [];

      for (let i = 0; i < idList.length; i++) {
        var trck =
        {
          id: data['audio_features'][i].id,
          danceability: data['audio_features'][i].danceability,
          energy: data['audio_features'][i].energy,
          acousticness: data['audio_features'][i].acousticness,
          valence: data['audio_features'][i].valence
        }
        featuresArray.push(trck);
      }

      console.log("Features array: ")
      console.log(featuresArray);

      return featuresArray;

    })
  }
}
