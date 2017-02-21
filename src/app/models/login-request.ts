export class LoginRequest{
	constructor(
		public user_login: string,
        public password: string,
        public client_application_id: string,
        public image_id: string
	){}
}