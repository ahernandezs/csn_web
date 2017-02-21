import { Images } from './images';

export class PreregisterResponse{
	constructor(
                public full_name: string,
                public images: Array<Images>
	){}
}