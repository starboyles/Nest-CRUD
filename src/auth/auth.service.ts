import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UsersService } from "src/users/users.service";
import { LoginDto } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt"; 
import { Users } from "src/users/users.model";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor (
        private readonly prismaService: PrismaService,
        private jwtService: JwtService,
        private readonly usersService: UsersService) {}

        async login(loginDto: LoginDto):Promise<any>{
            const {username, password} = loginDto;
            const user = await this.prismaService.user.findUnique({
                where: {username}
            })
            if (!user) {
                throw new NotFoundException('user not found');
            }
        const validatePassword = await bcrypt.compare(password, user.password)
        if (!user) {
            throw new NotFoundException('user not found');
        }
}
}