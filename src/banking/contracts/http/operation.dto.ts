import {
    IsInt,
    IsPositive,
    IsString,
    IsNumber,
    IsOptional,
    IsIn,
} from "class-validator";
import type {
    GetOperationsRequest,
    CreateOperationRequest,
} from "../../domain/operation";

export class GetOperationsHttpRequest implements GetOperationsRequest {
    @IsInt()
    @IsPositive()
    readonly accountId!: number;

    @IsInt()
    @IsPositive()
    readonly userId!: number;

    @IsOptional()
    @IsString()
    readonly startDate?: string;

    @IsOptional()
    @IsString()
    readonly endDate?: string;

    @IsOptional()
    @IsString()
    readonly operationType?: string;
}

export class CreateOperationHttpRequest implements CreateOperationRequest {
    @IsInt()
    @IsPositive()
    readonly accountId!: number;

    @IsInt()
    @IsPositive()
    readonly userId!: number;

    @IsString()
    @IsIn(["deposit", "withdrawal", "transfer", "payment"])
    readonly type!: string;

    @IsNumber()
    @IsPositive()
    readonly amount!: number;

    @IsString()
    readonly description!: string;
}
