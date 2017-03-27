export class BlockUserRequest{
	constructor(
        public user_login: string
	){ }
    source_operation_web = "WEB";
    user_manager_operation = "blocking";
}