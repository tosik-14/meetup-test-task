import { IsEmail, IsString, MinLength, IsEnum } from "class-validator";
import { ROLE } from "../entities/user-role.enum";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
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
    @MinLength(3)
    password: string;

    @ApiProperty({
        description: "User role",
        example: "user",
        enum: ROLE,
        default: ROLE.USER,
    })
    @IsEnum(ROLE)
    role: ROLE = ROLE.USER;
}