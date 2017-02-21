export class ActivateThirdAccountResponse {
	constructor(
		public beneficiary: string,
		public bank_name: string,
		public last_digits: string
	){}
}