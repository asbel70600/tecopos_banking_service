import type {
    GetAccountsRequest,
    GetAccountsResponse,
    GetAccountByIdRequest,
    GetAccountByIdResponse,
} from "./bank_account";

export interface BankingServicePort {
    getAccounts(request: GetAccountsRequest): Promise<GetAccountsResponse>;
}
