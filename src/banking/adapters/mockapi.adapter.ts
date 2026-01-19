import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import type { MockApiPort } from "./mockapi.port";
import type { BankAccount } from "../domain/bank_account";

@Injectable()
export class MockApiAdapter implements MockApiPort {
    private readonly baseUrl =
        process.env["MOCKAPI_URL"] ||
        "https://696d27faf4a79b315180a5e0.mockapi.io/api/v1";

    async getAccounts(): Promise<BankAccount[]> {
        console.log("Adapter");
        try {
            const response = await fetch(`${this.baseUrl}/BankAccount`);
            console.log(response);
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
}
