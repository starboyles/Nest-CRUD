import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport';
import { PrismaService } from 'src/prisma.service';

@Injectable
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly prismaService:PrismaService){
        super ({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        })
    }
    async validate(payload:{username}) {
        const users = await this.prismaService.user.findUnique({
            where: {
                username: payload.username

            }
        })
        return users;
    }
}