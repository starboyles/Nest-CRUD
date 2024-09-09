import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { ConflictException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            users: {
              findUnique: jest.fn(),
              findMany: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllUser', () => {
    it('should return an array of users', async () => {
      const users = [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }];
      jest.spyOn(prismaService.users, 'findMany').mockResolvedValue(users as any);

      const result = await service.getAllUser();

      expect(result).toEqual(users);
    });
  });

  describe('createUser', () => {
    it('should create a user and return it', async () => {
      const user = { id: 1, username: 'newuser' };
      const createUserDto = { username: 'newuser', password: 'password' };
      jest.spyOn(prismaService.users, 'findUnique').mockResolvedValue(null);
      jest.spyOn(prismaService.users, 'create').mockResolvedValue(user as any);

      const result = await service.createUser(createUserDto as any);

      expect(result).toEqual(user);
    });

    it('should throw an error if username already exists', async () => {
      const existingUser = { id: 1, username: 'existinguser' };
      jest.spyOn(prismaService.users, 'findUnique').mockResolvedValue(existingUser as any);

      await expect(service.createUser({ username: 'existinguser', password: 'password' } as any))
        .rejects
        .toThrowError('username already exists');
    });
  });
});
