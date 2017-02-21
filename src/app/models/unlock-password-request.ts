export class UnlockPasswordRequest {
	constructor(
		public user_login: string,
        public password: string,
        public image_id: string,
        public activation_code: string
	){}
}