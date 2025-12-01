import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
       @InjectRepository(User)
       private userRepository: Repository<User>,
       private jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto){
        const { email, password, role } = registerDto;

        const exitingUser = await this.userRepository.findOne({ where: { email } });
        if(exitingUser) {
            throw new UnauthorizedException("User with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            role,
        })

        await this.userRepository.save(user);

        return this.generateToken(user);
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.userRepository.findOne({ where: { email } });
        if(!user) {
            throw new UnauthorizedException("User with this email not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException("Incorrect password")

        return this.generateToken(user);

    }

    private generateToken(user: User) {
        const tokenPayload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };

        const accessToken = this.jwtService.sign(tokenPayload, {
            expiresIn: "3d",
        })

        const refreshToken = this.jwtService.sign(
            { id: user.id },
            { expiresIn: "3d" },
        );

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        };
    }

    async validateUserById(userId: number) {
        return this.userRepository.findOne({ where: { id: userId } });
    }

    async refreshTokens(refreshToken: string) {
        try {
            const tokenPayload = this.jwtService.verify(refreshToken);
            const user = await this.validateUserById(tokenPayload.id);

            if (!user) {
                throw new UnauthorizedException("User not found");
            }

            return this.generateToken(user);
        } catch (err) {
            throw new UnauthorizedException("Invalid refresh token");
        }
    }

}