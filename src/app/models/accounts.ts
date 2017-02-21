export class Accounts {
	constructor(
		public _account_id: string,
		public total_balance: string,
		public account_type: string,
		public description: string,
		public available_balance: string,
		public config: string
	){}
}