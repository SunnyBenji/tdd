import {BankAccount} from "./bankAccount";

export interface Transaction {
    type: "deposit" | "withdrawal" | "transfer" | "loan";
    amount: number;
    toAccount?: BankAccount;
}