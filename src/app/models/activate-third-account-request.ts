export class ActivateThirdAccountRequest {
	constructor(
		public activation_code: string,
		public _account_id: string
	){}
}