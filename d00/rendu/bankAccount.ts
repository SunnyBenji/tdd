import {Transaction} from "./transactionInterface";
import {Bank} from "./bank";

// Notre compte bancaire
export class BankAccount {
    public bank: Bank;
    public balance: number = 0;
    public history: Transaction[] = [];
    public beneficiaries: BankAccount[] = [];
    public loan: number = 0

    constructor(bank: Bank) {
        this.bank = bank;
    }

    // Voir l'argent sur le compte
    public getBalance(): number {
        return this.balance
    }

    // Déposer de l'argent dans le compte
    public deposit(amount: number): void {
        if (amount <= 0) {
            throw new Error("You can't deposit 0 or negative money")
        }
        this.balance += amount;
        const transaction: Transaction = {
            type: "deposit",
            amount,
        }
        // Historique
        this.history.push(transaction);
    }

    // Retirer de l'argent dans le compte
    public withdraw(amount: number): void {
        if (amount <= 0) {
            throw new Error("You can't withdraw 0 or negative money")
        }
        this.balance -= amount;
        const transaction: Transaction = {
            type: "withdrawal",
            amount,
        }
        // Historique
        this.history.push(transaction);

    }

    // Virement de l'argent dans un autre compte
    public transfer(toAccount: BankAccount, amount: number): void {
        if (amount <= 0) {
            throw new Error("You can't transfert 0 or negative money")
        }
        if(amount > this.balance) {
            throw new Error("You don't have enough money")
        }
        if(!this.beneficiaries.includes(toAccount)){
            throw new Error("This account is not in your beneficiaries list")
        }
        this.balance -= amount
        toAccount.deposit(amount);

        // Historique de transfert
        this.history.push({
            type: "transfer",
            amount,
            toAccount
        });
    }

    // Bénéficiaires
    // Ajouter un bénéficiaire
    public addBeneficiary(account: BankAccount): void {
        if(this.beneficiaries.includes(account)){
            throw new Error("Account already in your beneficiaries")
        }
        this.beneficiaries.push(account)
    }
    // Retirer un bénéficiaire
    public removeBeneficiary(account: BankAccount): void {
        if(!this.beneficiaries.includes(account)){
            throw new Error("Account is not in your beneficiaries")
        }
        this.beneficiaries.splice(this.beneficiaries.indexOf(account), 1);
    }
    // Faire un prêt
    public makeALoan(amount: number): void {
        if (amount <= 0) {
            throw new Error("You can't loan 0 or negative money")
        }
        if (amount+this.loan > 0.2*this.balance) {
            throw new Error("You are not authorize to loan this amount")
        }
        if (!this.history.find((transaction) => transaction.type === "loan")) {
            this.history.push({
                type: "loan",
                amount,
            })
            this.bank.attributeLoan(this, amount);
            this.balance += amount;
            this.loan += amount;
        } else {
            throw new Error('You already have one loan')
        }
    }
}