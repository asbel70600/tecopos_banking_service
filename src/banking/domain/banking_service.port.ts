import type {
    GetAccountsRequest,
    GetAccountsResponse,
    GetAccountByIdRequest,
    GetAccountByIdResponse,
} from "./bank_account";
import type {
    GetOperationsRequest,
    GetOperationsResponse,
    CreateOperationRequest,
    CreateOperationResponse,
} from "./operation";

export interface BankingServicePort {
    getAccounts(request: GetAccountsRequest): Promise<GetAccountsResponse>;
    getAccountById(
        request: GetAccountByIdRequest,
    ): Promise<GetAccountByIdResponse>;
    getOperations(
        request: GetOperationsRequest,
    ): Promise<GetOperationsResponse>;
    createOperation(
        request: CreateOperationRequest,
    ): Promise<CreateOperationResponse>;
}
