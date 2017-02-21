export class TransferRequest{
	constructor(
        public account_id_destination: string,
        public amount: string,
        public concept: string,
        public password: string
	){}
}