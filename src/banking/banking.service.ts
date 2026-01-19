import { Injectable, NotFoundException } from "@nestjs/common";
import { BankingServicePort } from "./domain/banking_service.port";
import { GetAccountsRequest, GetAccountsResponse } from "./domain/bank_account";
import { MockApiAdapter } from "./adapters/mockapi.adapter";

@Injectable()
export class BankingService implements BankingServicePort {
    constructor(private readonly mockApi: MockApiAdapter) {}

    async getAccounts(
        _request: GetAccountsRequest,
    ): Promise<GetAccountsResponse> {
        console.log("Injected");
        const accounts = await this.mockApi.getAccounts();
        return { accounts };
    }
}
