import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { BankingService } from "./banking.service";
import type {
    GetAccountsGrpcRequest,
    GetAccountsGrpcResponse,
    GetAccountByIdGrpcRequest,
    GetAccountByIdGrpcResponse,
} from "./contracts/grpc/bank_account";
import type {
    GetOperationsGrpcRequest,
    GetOperationsGrpcResponse,
    CreateOperationGrpcRequest,
    CreateOperationGrpcResponse,
} from "./contracts/grpc/operation";

@Controller()
export class BankingGrpcController {
    constructor(private readonly bankingService: BankingService) {}

    @GrpcMethod("BankingService", "GetAccounts")
    async getAccounts(
        request: GetAccountsGrpcRequest,
    ): Promise<GetAccountsGrpcResponse> {
        return this.bankingService.getAccounts(request);
    }

    @GrpcMethod("BankingService", "GetAccountById")
    async getAccountById(
        request: GetAccountByIdGrpcRequest,
    ): Promise<GetAccountByIdGrpcResponse> {
        return this.bankingService.getAccountById(request);
    }

    @GrpcMethod("BankingService", "GetOperations")
    async getOperations(
        request: GetOperationsGrpcRequest,
    ): Promise<GetOperationsGrpcResponse> {
        return this.bankingService.getOperations(request);
    }

    @GrpcMethod("BankingService", "CreateOperation")
    async createOperation(
        request: CreateOperationGrpcRequest,
    ): Promise<CreateOperationGrpcResponse> {
        return this.bankingService.createOperation(request);
    }
}
