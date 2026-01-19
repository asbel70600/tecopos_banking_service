import type { BankAccount } from "../domain/bank_account";

export interface MockApiPort {
    getAccounts(): Promise<BankAccount[]>;
}
