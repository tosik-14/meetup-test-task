import { IsEmail, IsString, MinLength, IsEnum } from "class-validator";
import { ROLE } from "../entities/user-role.enum";

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(3)
    password: string;

    @IsEnum(ROLE)
    role: ROLE = ROLE.USER;
}