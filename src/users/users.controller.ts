import { Controller, Get, Param, Req, Res, NotFoundException} from '@nestjs/common';
import { UsersService } from "./users.service";
import { Request, Response } from 'express';

@Controller('users') 
export class UsersController {
    constructor(private readonly userService: UsersService){}
    @Get()
    async getAllUsers(@Req() request:Request , @Res() response:Response ):Promise<any> {
        try {
            const result = await this.userService.getAllUser();
            return response.status(200).json(
                {
                    status: 'ok',
                    message: "Data Fetched Successfully",
                    result: result
                }
            )
        }catch(err) {
            return response.status(500).json({
                status: 'error',
                message: "Internal Server Error",
            }
            )
        }
    }
    @Get(':id')
    async getUserById(@Param('id') id: string, @Res() response: Response): Promise<any> {
      try {
        const numericId = parseInt(id, 10); 
        const result = await this.userService.getUserById(numericId);
        if (!result) {
          throw new NotFoundException('User not found');
        }
        return response.status(200).json({
          status: 'ok',
          message: 'User Fetched Successfully',
          result: result,
        });
      } catch (err) {
        return response.status(500).json({
          status: 'error',
          message: err.message || 'Internal Server Error',
        });
      }
    }
    

}