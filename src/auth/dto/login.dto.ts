import {IsEmail, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({
        description: "User email",
        example: "test@example.com"
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "User password",
        example: "123",
        minLength: 3,
    })
    @IsString()
    password: string;
}