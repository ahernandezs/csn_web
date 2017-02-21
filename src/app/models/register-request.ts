export class RegisterRequest {
	constructor(
		public user_login: string,
		public image_id: string,
        public activation_code: string,
        public password: string
	){}
}