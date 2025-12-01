import {Post, Controller, Body} from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @ApiOperation({ summary: "Registration" })
    @ApiBody({ type: RegisterDto })
    @ApiResponse({
        status: 201,
        description: "User successfully registered",
        schema: {
            example: {
                access_token: "eyJhbGciOiJIUzI1NiIs...",
                refresh_token: "eyJhbGciOiJIUzI1NiIs...",
                user: {
                    id: 1,
                    email: "user@test.com",
                    role: "user"
                }
            }
        }
    })
    @ApiResponse({ status: 400, description: "Bad request" })
    @ApiResponse({ status: 409, description: "User with this email already exists" })
    @Post("register")
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @ApiOperation({ summary: "Login" })
    @ApiBody({ type: LoginDto })
    @ApiResponse({
        status: 201,
        description: "User successfully logged in",
        schema: {
            example: {
                access_token: "eyJhbGciOiJIUzI1NiIs...",
                refresh_token: "eyJhbGciOiJIUzI1NiIs...",
                user: {
                    id: 1,
                    email: "user@test.com",
                    role: "user"
                }
            }
        }
    })
    @ApiResponse({ status: 401, description: "Invalid data" })
    @Post("login")
    async login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto);
    }
}
