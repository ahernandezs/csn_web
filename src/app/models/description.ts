import { OpeningHours } from './openingHours';
import { Address } from './address';

export class Description{
	constructor(
        public type: string,
        public address: Address,
        public openingHours: OpeningHours
	){}
}