import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { BankingService } from "./banking.service";
import type {
    GetAccountsGrpcRequest,
    GetAccountsGrpcResponse,
} from "./contracts/grpc/bank_account";

@Controller()
export class BankingGrpcController {
    constructor(private readonly bankingService: BankingService) {}

    @GrpcMethod("BankingService", "GetAccounts")
    async getAccounts(
        request: GetAccountsGrpcRequest,
    ): Promise<GetAccountsGrpcResponse> {
        console.log("Reached controller");
        console.log(request);
        return this.bankingService.getAccounts(request);
    }
}
