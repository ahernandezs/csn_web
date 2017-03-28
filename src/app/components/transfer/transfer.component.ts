import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service'
import { ThirdAccountService } from '../../services/third.account.service';
import { TransferService } from '../../services/transfer.service';
import { TransferRequest } from '../../models/transfer-request';
import { Accounts } from '../../models/accounts';
import { ThirdAccount } from '../../models/third-account';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.sass']
})
export class TransferComponent implements OnInit {

    thirdAccounts: Array<ThirdAccount>;
    ownAccounts: Array<Accounts>;

    sourceAccountId: string;
    account_id_destination: string;
    amount: string;
    concept: string;
    password: string;
    ownDescription: string;
    thirdDescription: string;
    authnum;
    opt;
    step;

    constructor(
	    private router: Router,
        private thirdAccountService: ThirdAccountService,
        private accountService: AccountService,
        private transferService: TransferService
    ) { }

    ngOnInit() {
        this.sourceAccountId = "";
        this.account_id_destination = "";
        this.amount = "";
        this.concept  = "";
        this.password = "";
        this.step = 1;
        this.opt = "own";
        this.ownDescription = "Cuenta retiro";
        this.thirdDescription = "Cuenta de depósito";
        this.accountService.getAccounts().subscribe(
            response => {
                this.ownAccounts = response;
            },
            err => {
                console.log('Error al traer las cuentas propias');
            }
        );
        this.thirdAccountService.getThirdAccounts().subscribe(
            response => {
                this.thirdAccounts = response;
            },
            error => {
                console.log('Error al traer las cuentas de terceros');
            }
        );
    }

    cancelar(){
        this.step = 1;
        this.sourceAccountId = "";
        this.account_id_destination = "";
        this.amount = "";
        this.concept  = "";
        this.password = "";
        this.ownDescription = "Cuenta retiro";
        this.thirdDescription = "Cuenta de depósito";
    }

    validate(){
        this.step = 2;
    }

    goToAccounts(){
        this.router.navigate(['/home']);
    }

    transfer(view: String): void{
        let transferRequest = new TransferRequest(this.account_id_destination, this.amount, this.concept, this.password);
        this.transferService.transfer(this.sourceAccountId, transferRequest).subscribe(
            res => {
                console.log('Todo bien');
                this.step = 3;
                this.authnum = res.authorization_number;
            },
            err => {
                console.log('Todo mal');
            }
        );
    }

    selectOwn(account, desc){
        this.sourceAccountId = account;
        this.ownDescription = desc;
    }

    selectThird(account, desc){
        this.account_id_destination = account;
        this.thirdDescription = desc;
    }

}
