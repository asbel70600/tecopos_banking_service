import type { BankAccount } from "../domain/bank_account";
import type { Operation } from "../domain/operation";

export interface MockApiPort {
    getAccounts(userId: number): Promise<BankAccount[]>;
    getAccountById(
        accountId: number,
        userId: number,
    ): Promise<BankAccount | null>;
    getOperations(
        accountId: number,
        startDate?: string,
        endDate?: string,
        type?: string,
    ): Promise<Operation[]>;
    createOperation(
        accountId: number,
        type: string,
        amount: number,
        description: string,
    ): Promise<Operation>;
}
