import { ResourceData } from './resource-data';
import { TrackData } from './track-data';

export class PlaylistData extends ResourceData {
    tracks:TrackData[];

	constructor(objectModel:{}) {
		super(objectModel);
        this.category="playlist";
        this.tracks = objectModel['tracks'];
    }

}
