import {BankAccount} from "./bankAccount";
import {Loans} from "./loanInterface";

// La banque
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

    // Attribuer des prêts
    public attributeLoan = (account: BankAccount, amount: number): void => {
        const loan: Loans =  {
            amount,
            account,
        }
        this.loans.push(loan)
    }
}