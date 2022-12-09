import {Bank} from "./bank";
import {BankAccount} from "./bankAccount";

describe('Bank class', () => {
    let bank: Bank
    let bankAccount: BankAccount
    beforeEach(() => {
        bank = new Bank()
        bankAccount = new BankAccount(bank)
    })

    // Créer une banque
    describe('bank creation', () => {
        it('should return a bank when a bank is given ',() => {
            expect(bank).toBeInstanceOf(Bank)
        })

        it('should contain an empty bank account array', () => {
            expect(bank.accounts).toEqual([])
        })
    })

    // Gestion de compte
    describe('account handling', () => {

        // Ajout d'un compte
        it('should add a new account when using createAccount function', () => {
            let account = bank.createAccount();
            expect(bank.accounts).toContain(account)
        })

        // Suppression d'un compte
        it('should return a bank and all account  without the account pass ', () => {
            let account = bank.createAccount();
            bank.removeAccount(account);
            expect(bank.accounts).not.toContain(account)
        })
    })

    describe('loan handling', () => {
        // Ajout d'un emprunt
        it('should add a new loan when using createAccount function', () => {
            bankAccount.deposit(500);
            bank.attributeLoan(bankAccount, 2)
            expect(bank.loans[0]).toMatchObject(
                {
                    amount: 2,
                    account: bankAccount
                }
            )
        })

        it('should add a new loan in bank.loans when using function makeALoan from bankAccount.ts', () => {
            bankAccount.deposit(500);
            bankAccount.makeALoan(2);
            expect(bank.loans[0]).toMatchObject(
                {
                    amount: 2,
                    account: bankAccount
                }
            )
        })
        it('should return an error when try to loan more than 20% of his own balance additionate to the money already loan', () => {
            bankAccount.deposit(4);
            expect( () => bankAccount.makeALoan(2)).toThrowError('You are not authorize to loan this amount')
        })
    })
})