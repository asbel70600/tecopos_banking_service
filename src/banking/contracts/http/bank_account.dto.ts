import { IsInt, IsPositive } from "class-validator";
import type {
    GetAccountsRequest,
    GetAccountByIdRequest,
} from "../../domain/bank_account";

export class GetAccountsHttpRequest implements GetAccountsRequest {
    @IsInt()
    @IsPositive()
    readonly userId!: number;
}

export class GetAccountByIdHttpRequest implements GetAccountByIdRequest {
    @IsInt()
    @IsPositive()
    readonly accountId!: number;

    @IsInt()
    @IsPositive()
    readonly userId!: number;
}
