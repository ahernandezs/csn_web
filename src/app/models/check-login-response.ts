import { Images } from './images';

export class CheckLoginResponse{
    constructor(
        public client_name: string,
        public images[]: Images
    ){}
}
