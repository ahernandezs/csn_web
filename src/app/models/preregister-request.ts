export class PreregisterRequest{
	constructor(
		public user_login: string,
		public activation_code: string
	){}
}