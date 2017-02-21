import { Images } from './images';

export class UnlockPasswordPreResponse {
	constructor(
                public full_name: string,
                public images: Array<Images>
	){}
}