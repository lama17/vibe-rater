import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';
import { PlaylistData } from '../data/playlist-data';
import { ɵConsole } from '@angular/core/src/core';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    var promise = this.http.get(this.expressBaseUrl+endpoint, {responseType: 'json'}).toPromise();
    return Promise.resolve(promise);
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  getMyPlaylists():Promise<PlaylistData[]> {
    // Returns all of a user's playlists.
    return this.sendRequestToExpress('/me/playlists').then(data => {
      let playlistData:PlaylistData[];
      playlistData = data['items'].map(playlist => {
        console.log(new PlaylistData(playlist));
        return new PlaylistData(playlist);

    });
    return playlistData;
  });
}

  getMyLibrary():Promise<TrackData[]> {
    // Returns a user's song library to an array of track objects
    return this.sendRequestToExpress('/me/tracks').then(data => {
      let trackData:TrackData[];
      trackData = data['items'].map(item => {
        return new TrackData(item['track']);
      });
      return trackData;
    });
  }

  getTracksFromPlaylist(playlistId:string):Promise<TrackData[]> {
    // returns tracks for a specific playlist
    return this.sendRequestToExpress('/playlists/' + encodeURIComponent(playlistId) + '/tracks').then(response => {
      let trackData:TrackData[];
      trackData = response['items'].map(item => {
        return new TrackData(item['track']);
      });
      return trackData;
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    return this.sendRequestToExpress(`/search/${category}/${encodeURIComponent(resource)}`).then(data => {
      //console.log(data);
      if (category == 'artist') {
        let results = data['artists']['items'].map(artist => {
          return new ArtistData(artist);
        });
        return results;
      }

      if (category == 'album') {
        let results = data['albums']['items'].map(album => {
          return new AlbumData(album);
        });
        return results;

      }
      if (category == 'track') {
        let results = data['tracks']['items'].map(track => {
          return new TrackData(track);
        });
        return results;
      }else{
        return null;
      }
    });

  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    return this.sendRequestToExpress(`/artist/${encodeURIComponent(artistId)}`).then(data => {
      return new ArtistData(data);
    });
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    return this.sendRequestToExpress('/artist-related-artists/' + encodeURIComponent(artistId)).then(response => {
      let artistData:ArtistData[];
      artistData = response['artists'].map(artist => {
        return new ArtistData(artist);
      });
      console.log(artistData.length);
      return artistData;
    });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    return this.sendRequestToExpress('/artist-top-tracks/' + encodeURIComponent(artistId)).then(response => {
      let trackData:TrackData[];
      trackData = response['tracks'].map(track => {
        return new TrackData(track);
      });
      console.log(trackData.length);
      return trackData;
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    return this.sendRequestToExpress('/artist-albums/' + encodeURIComponent(artistId)).then(response => {
      let albumData:AlbumData[];
      albumData = response['items'].map(album => {
        return new AlbumData(album);
      });
      console.log(AlbumData.length);
      return albumData;
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    return this.sendRequestToExpress('/album/' + encodeURIComponent(albumId)).then(response => {
      let albumdata = new AlbumData(response);
      return albumdata;
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    return this.sendRequestToExpress('/album-tracks/' + encodeURIComponent(albumId)).then(response => {
      let trackData:TrackData[];
      trackData = response['items'].map(track => {
        return new TrackData(track);
      });
      return trackData;
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    return this.sendRequestToExpress(`/track/${encodeURIComponent(trackId)}`).then(data => {
      return new TrackData(data);
    });
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    return this.sendRequestToExpress(`/track-audio-features/${encodeURIComponent(trackId)}`).then((data) => {
      console.log(data)
      var featuresArray = [];
      featuresArray.push(new TrackFeature('danceability', data['danceability']));
      featuresArray.push(new TrackFeature('energy', data['energy']));
      featuresArray.push(new TrackFeature('speechiness', data['speechiness']));
      featuresArray.push(new TrackFeature('acousticness', data['acousticness']));
      featuresArray.push(new TrackFeature('instrumentalness', data['instrumentalness']));
      featuresArray.push(new TrackFeature('liveness', data['liveness']));
      featuresArray.push(new TrackFeature('valence', data['valence']));
      return featuresArray;

  });
}

}
