import { Module } from "@nestjs/common";
import { BankingService } from "./banking.service";
import { BankingGrpcController } from "./banking.controller.grpc";
import { MockApiAdapter } from "./adapters/mockapi.adapter";

@Module({
    controllers: [BankingGrpcController],
    providers: [BankingService, MockApiAdapter],
    exports: [BankingService],
})
export class BankingModule {}
