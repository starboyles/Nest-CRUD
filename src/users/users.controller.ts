import {
  Controller,
  Get,
  Param,
  Req,
  Res,
  NotFoundException,
  Put,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { JWTauthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  @UseGuards(JWTauthGuard) 
  async getAllUsers(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.userService.getAllUser();
      return response.status(200).json({
        status: 'ok',
        message: 'Data Fetched Successfully',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }
  @Get(':id')
  @UseGuards(JWTauthGuard)
  async getUserById(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<any> {
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
  @Put(':id')
  @UseGuards(JWTauthGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const numericId = parseInt(id, 10); 
      const updatedUser = await this.userService.updateUser(
        numericId,
        updateUserDto,
      );
      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
      return response.status(200).json({
        status: 'ok',
        message: 'User Updated Successfully',
        result: updatedUser,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
      });
    }
  }
  @Delete(':id')
  @UseGuards(JWTauthGuard)
  async deleteUser(
    @Param('id') id: string, 
    @Res() response: Response
  ): Promise<any> {
    try {
      const numericId = parseInt(id, 10); 
      const deletedUser = await this.userService.deleteUser(numericId);
      if (!deletedUser) {
        throw new NotFoundException('User not found');
      }
      return response.status(200).json({
        status: 'ok',
        message: 'User Deleted Successfully',
        result: deletedUser,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
      });
    }
  }
}
