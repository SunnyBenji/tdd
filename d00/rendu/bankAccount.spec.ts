import {BankAccount} from "./bankAccount";
import {Bank} from "./bank";

describe('Bank class', () => {
    let bank: Bank
    let account: BankAccount
    let otherAccounts: Array<BankAccount>
    beforeEach(() => {
        bank = new Bank();
        account = bank.createAccount();
        otherAccounts = [];
        for (let i = 0; i < 5; i++) {
            otherAccounts.push(bank.createAccount());
        }
    })

    // Test des bénéficiaires
    describe("Beneficiary", () => {
        it('should add a new beneficary', () => {
            account.addBeneficiary(otherAccounts[0])
            expect(account.beneficiaries).toContain(otherAccounts[0]);
        })
        it('should have 5 beneficary in beneficiaries', () => {
            account.addBeneficiary(otherAccounts[0])
            account.addBeneficiary(otherAccounts[1])
            account.addBeneficiary(otherAccounts[2])
            account.addBeneficiary(otherAccounts[4])
            account.addBeneficiary(otherAccounts[3])
            expect(account.beneficiaries.length).toBe(5);
        })
        it('should return an error when trying to add the same beneficiary more than once', () => {
            account.addBeneficiary(otherAccounts[0])
            expect(() => account.addBeneficiary(otherAccounts[0])).toThrowError('Account already in your beneficiaries')
        })
        it('should remove a beneficary', () => {
            account.addBeneficiary(otherAccounts[0])
            account.addBeneficiary(otherAccounts[1])
            account.removeBeneficiary(otherAccounts[1])
            expect(account.beneficiaries).not.toContain(otherAccounts[1]);
        })
        it('should have 3 beneficary in beneficiaries', () => {
            account.addBeneficiary(otherAccounts[0])
            account.addBeneficiary(otherAccounts[1])
            account.addBeneficiary(otherAccounts[2])
            account.addBeneficiary(otherAccounts[4])
            account.addBeneficiary(otherAccounts[3])
            account.removeBeneficiary(otherAccounts[1])
            account.removeBeneficiary(otherAccounts[3])
            expect(account.beneficiaries.length).toBe(3);
        })
        it('should return an error when trying to remove a beneficiary when not in beneficiaries', () => {
            expect(() => account.removeBeneficiary(otherAccounts[0])).toThrowError('Account is not in your beneficiaries')
        })
    })

    // Test voir son argent
    describe("Get balance", () => {
        it('Should return 100 ',() => {
            account.deposit(100);
            expect(account.getBalance()).toBe(100)
        })
        it('Should return 18759 ',() => {
            account.deposit(18759);
            expect(account.getBalance()).toBe(18759)
        })
    })

    // Test déposer de l'argent
    describe("Deposit money", () => {
        it('Should return 100 ',() => {
            account.deposit(100);
            expect(account.balance).toBe(100)
        })
        it('Should return 18759 ',() => {
            account.deposit(18759);
            expect(account.balance).toBe(18759)
        })
        it('Should return an error',() => {
            expect(() => account.deposit(-1)).toThrowError('You can\'t deposit 0 or negative money');
        })
        it('Should return an error',() => {
            expect(() => account.deposit(0)).toThrowError('You can\'t deposit 0 or negative money');
        })
    })

    // Test retirer de l'argent
    describe("Withdraw money", () => {
        it('Should return 100 ',() => {
            account.deposit(200);
            account.withdraw(100);
            expect(account.balance).toBe(100)
        })
        it('Should return 4500 ',() => {
            account.deposit(5600);
            account.withdraw(1100)
            expect(account.balance).toBe(4500)
        })
        it('Should return an error ',() => {
            expect(() => account.withdraw(-1)).toThrowError('You can\'t withdraw 0 or negative mone');
        })
        it('Should return an error ',() => {
            expect(() => account.withdraw(0)).toThrowError('You can\'t withdraw 0 or negative mone');
        })
    })

    // Test virement
    describe("Money transfer to another account", () => {
        it('Should return 100 on the other account',() => {
            account.deposit(200);
            account.addBeneficiary(otherAccounts[0])
            account.transfer(otherAccounts[0],100);
            expect(otherAccounts[0].balance).toBe(100);
            expect(account.balance).toBe(100);
        })

        it('should return an error if there is not enough money', () => {
            account.deposit(10);
            expect(() => account.transfer(otherAccounts[0],100)).toThrowError('You don\'t have enough money');
        })

        it('should return an error if the destination account is not in the beneficiary list', () => {
            account.deposit(1000)
            expect(() => account.transfer(otherAccounts[1], 100)).toThrowError('This account is not in your beneficiaries list')
        })
        it('Should return an error ',() => {
            account.deposit(200);
            account.addBeneficiary(otherAccounts[0])
            expect(() => account.transfer(otherAccounts[0], -1)).toThrowError("You can't transfert 0 or negative money");
        })
        it('Should return an error ',() => {
            account.deposit(200);
            account.addBeneficiary(otherAccounts[0])
            expect(() => account.transfer(otherAccounts[0], 0)).toThrowError("You can't transfert 0 or negative money");
        })
    })

    // Vérification du fonctionnement de l'historique
    describe("History verification", () => {
        it('Should have withdraw in the history',() => {
            account.deposit(200);
            account.withdraw(100);
            const history = account.history;
            expect(history[1]).toMatchObject({
                type: "withdrawal",
                amount: 100
            });
        })
        it('Should have deposit in the history',() => {
            account.deposit(200);
            const history = account.history;
            expect(history[0]).toMatchObject({
                type: "deposit",
                amount: 200
            });
        })
        it('Should have transfer in the history',() => {
            account.deposit(300);
            account.addBeneficiary(otherAccounts[0])
            account.transfer(otherAccounts[0], 200)
            const history = account.history;
            expect(history[1]).toMatchObject({
                type: "transfer",
                amount: 200
            });
        })
        it('Should have 4 transactions in the history when do 4 transaction',() => {
            account.deposit(150000);
            account.addBeneficiary(otherAccounts[0])
            account.transfer(otherAccounts[0], 189.90)
            account.withdraw(200.20)
            account.transfer(otherAccounts[0], 200.40)
            const history = account.history;
            expect(history.length).toBe(4);
        })
        it('Should return all transaction history',() => {
            account.deposit(150000);
            account.addBeneficiary(otherAccounts[0])
            account.transfer(otherAccounts[0], 189.90)
            account.withdraw(200.20)
            const history = account.history;
            expect(history).toMatchObject([
                {
                    type: "deposit",
                    amount: 150000
                },
                {
                    type: "transfer",
                    amount: 189.90
                },
                {
                    type: "withdrawal",
                    amount: 200.20
                }
            ]);
        })
    })

    describe('Make a loan', () => {
        it('should return an error when trying to make a loan too large', function () {
            account.deposit(100)
            expect(() => account.makeALoan(100000)).toThrowError('You are not authorize to loan this amount')
        });

        it("shouldn't make a new loan when there is already one", function () {
            account.deposit(100000)
            account.makeALoan(100)
            expect(() => account.makeALoan(100)).toThrowError('You already have one loan')
        });

        it('should have one loan when making a loan', () => {
            account.deposit(100000)
            account.makeALoan(100)
            expect(account.loan).toBe(100)
        })
        it('should return an error when making a loan when  0 money is require', () => {
            expect(() => account.makeALoan(0)).toThrowError('You can\'t loan 0 or negative money')
        })
        it('should return an error when making a loan with negative money is require', () => {
            expect(() => account.makeALoan(-1)).toThrowError('You can\'t loan 0 or negative money')
        })
    });
})