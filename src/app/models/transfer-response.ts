export class TransferResponse{
	constructor(
        public date: string,
        public amount: string,
        public description_fee: string,
        public third_aditional_info: string,
        public account_id_source: string,
        public description: string,
        public fifth_aditional_info: string,
        public account_id_destination: string,
        public transfer_fee: string,
        public first_aditional_info: string,
        public second_aditional_info: string,
        public fourth_aditional_info: string,
        public config: string,
        public authorization_number: string
	){}
}