import { Description } from './description';
import { Coordinates } from './coordinates';

export class Geolocation{
	constructor(
		public id: string,
        public name: string,
        public description: Description,
        public coordinates: Coordinates 
	){}
}