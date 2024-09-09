import { PrismaService } from 'src/prisma.service';
import { Users } from './users.model';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUser(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }

  async createUser(data: Users): Promise<Users> {
    const existing = await this.prisma.users.findUnique({
      where: {
        username: data.username,
      },
    });

    if (existing) {
      throw new ConflictException('Username already exists');
    }

    return this.prisma.users.create({
      data,
    });
  }

  // New method to get a user by ID
  async getUserById(id: number): Promise<Users> {
    const user = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
