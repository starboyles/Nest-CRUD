import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-user.dto";
import { Request, Response} from 'express';


@Controller()
export class AuthController {

    constructor(private readonly authService:AuthService){}
        @Post()
        async login(@Req() request:Request , @Res() response: Response, @Body() loginDto: LoginDto):Promise<any>{
            try {
                
            } catch (err) {
                
            }
        }
    }