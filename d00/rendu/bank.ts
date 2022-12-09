import {BankAccount} from "./bankAccount";
import {Transaction} from "./transactionInterface";
import {Loans} from "./loanInterface"
// Class Bank
export class Bank {
    public accounts: Array<BankAccount> = [];
    public loans: Array<Loans> = []
    // Ouvrir un compte
    public createAccount = (): BankAccount => {
        let account = new BankAccount(this)
        this.accounts.push(account);
        return account
    }

    // Cloturer un compte
    public removeAccount = (account: BankAccount): void => {
        const index = this.accounts.indexOf(account);
        if (index >= 0) {
            this.accounts.splice(index, 1);
        }
    }

    public attributeLoan = (account: BankAccount, amount: number): void => {
        const loan: Loans =  {
            amount,
            account,
        }
        this.loans.push(loan)
    }
}