import {Bank} from "./bank";

describe('Bank class', () => {
    let bank: Bank
    beforeEach(() => {
        bank = new Bank()
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

    })
})