export class Movements {
	constructor(
		public amount: string,
		public fee: string,
		public _account_id: string,
		public movement_type: string,
		public description: string,
		public config: string,
		public date: string,
		public description_fee: string,
		public account_type: string
	){}
}