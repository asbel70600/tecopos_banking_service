import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { type MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ValidationPipe } from "@nestjs/common";
import { join } from "node:path";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Add validation pipe for HTTP endpoints
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    // Configure gRPC microservice
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.GRPC,
        options: {
            package: "banking",
            protoPath: join(__dirname, "proto/banking.proto"),
            url: process.env["GRPC_URL"] || "0.0.0.0:50052",
        },
    });

    await app.startAllMicroservices();
    // await app.listen(process.env["PORT"] || 3002);

    console.log(
        "Banking gRPC server is listening on",
        process.env["GRPC_URL"] || "0.0.0.0:50052",
    );
    // console.log(
    //     "Banking HTTP server is listening on",
    //     process.env["PORT"] || 3002,
    // );
}
bootstrap();
