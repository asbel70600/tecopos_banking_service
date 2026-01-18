import { Injectable, NotFoundException } from "@nestjs/common";
import type { BankingServicePort } from "./domain/banking_service.port";
import type {
    GetAccountsRequest,
    GetAccountsResponse,
    GetAccountByIdRequest,
    GetAccountByIdResponse,
} from "./domain/bank_account";
import type {
    GetOperationsRequest,
    GetOperationsResponse,
    CreateOperationRequest,
    CreateOperationResponse,
} from "./domain/operation";
import { MockApiAdapter } from "./adapters/mockapi.adapter";

@Injectable()
export class BankingService implements BankingServicePort {
    constructor(private readonly mockApi: MockApiAdapter) {}

    async getAccounts(
        request: GetAccountsRequest,
    ): Promise<GetAccountsResponse> {
        const accounts = await this.mockApi.getAccounts(request.userId);
        return { accounts };
    }

    async getAccountById(
        request: GetAccountByIdRequest,
    ): Promise<GetAccountByIdResponse> {
        const account = await this.mockApi.getAccountById(
            request.accountId,
            request.userId,
        );

        if (!account) {
            throw new NotFoundException("Account not found");
        }

        return { account };
    }

    async getOperations(
        request: GetOperationsRequest,
    ): Promise<GetOperationsResponse> {
        const operations = await this.mockApi.getOperations(
            request.accountId,
            request.startDate,
            request.endDate,
            request.operationType,
        );

        return { operations };
    }

    async createOperation(
        request: CreateOperationRequest,
    ): Promise<CreateOperationResponse> {
        // Verify account ownership
        const account = await this.mockApi.getAccountById(
            request.accountId,
            request.userId,
        );
        if (!account) {
            throw new NotFoundException("Account not found");
        }

        const operation = await this.mockApi.createOperation(
            request.accountId,
            request.type,
            request.amount,
            request.description,
        );

        return { operation };
    }
}
