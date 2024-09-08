import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UsersService } from "src/users/users.service";
import { LoginDto } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt"; // Replace "path/to/jwt.service" with the actual path to the JWTService module

@Injectable()
export class AuthService {

    constructor (
        private readonly prismaService: PrismaService,
        private jwtService: JwtService,
        private readonly usersService: UsersService) {}

        async login(loginDto: LoginDto): 
}