export class LoginResponse{
	constructor(
        public full_name: string,
        public last_client_application_id: string,
        public last_access_date: string
	){}
}