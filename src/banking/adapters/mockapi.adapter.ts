import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import type { MockApiPort } from "./mockapi.port";
import type { BankAccount } from "../domain/bank_account";
import type { Operation } from "../domain/operation";

@Injectable()
export class MockApiAdapter implements MockApiPort {
    private readonly baseUrl =
        process.env["MOCKAPI_URL"] ||
        "https://your-mockapi-id.mockapi.io/api/v1";

    async getAccounts(userId: number): Promise<BankAccount[]> {
        try {
            const response = await fetch(
                `${this.baseUrl}/accounts?userId=${userId}`,
            );
            if (!response.ok) {
                throw new HttpException(
                    "Failed to fetch accounts",
                    HttpStatus.BAD_GATEWAY,
                );
            }
            return response.json();
        } catch (error) {
            throw new HttpException(
                "MockAPI service unavailable",
                HttpStatus.SERVICE_UNAVAILABLE,
            );
        }
    }

    async getAccountById(
        accountId: number,
        userId: number,
    ): Promise<BankAccount | null> {
        try {
            const response = await fetch(
                `${this.baseUrl}/accounts/${accountId}`,
            );
            if (!response.ok) {
                if (response.status === 404) return null;
                throw new HttpException(
                    "Failed to fetch account",
                    HttpStatus.BAD_GATEWAY,
                );
            }
            const account: BankAccount = await response.json();

            // Verify ownership
            if (account.userId !== userId) {
                throw new HttpException(
                    "Account not found",
                    HttpStatus.NOT_FOUND,
                );
            }

            return account;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new HttpException(
                "MockAPI service unavailable",
                HttpStatus.SERVICE_UNAVAILABLE,
            );
        }
    }

    async getOperations(
        accountId: number,
        startDate?: string,
        endDate?: string,
        type?: string,
    ): Promise<Operation[]> {
        try {
            let url = `${this.baseUrl}/operations?accountId=${accountId}`;
            if (type) url += `&type=${type}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new HttpException(
                    "Failed to fetch operations",
                    HttpStatus.BAD_GATEWAY,
                );
            }

            let operations: Operation[] = await response.json();

            // Filter by date range if provided
            if (startDate || endDate) {
                operations = operations.filter((op) => {
                    const opDate = new Date(op.date);
                    if (startDate && opDate < new Date(startDate)) return false;
                    if (endDate && opDate > new Date(endDate)) return false;
                    return true;
                });
            }

            return operations;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new HttpException(
                "MockAPI service unavailable",
                HttpStatus.SERVICE_UNAVAILABLE,
            );
        }
    }

    async createOperation(
        accountId: number,
        type: string,
        amount: number,
        description: string,
    ): Promise<Operation> {
        try {
            const response = await fetch(`${this.baseUrl}/operations`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    accountId,
                    type,
                    amount,
                    description,
                    date: new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new HttpException(
                    "Failed to create operation",
                    HttpStatus.BAD_GATEWAY,
                );
            }

            return response.json();
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new HttpException(
                "MockAPI service unavailable",
                HttpStatus.SERVICE_UNAVAILABLE,
            );
        }
    }
}
