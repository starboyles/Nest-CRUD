import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            users: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return a JWT token if login is successful', async () => {
      const loginDto = { username: 'testuser', password: 'password' };
      const user = { id: 1, username: 'testuser', password: await bcrypt.hash('password', 10) };
      jest.spyOn(prismaService.users, 'findUnique').mockResolvedValue(user as any);
      jest.spyOn(jwtService, 'sign').mockReturnValue('jwt-token');

      const result = await service.login(loginDto);

      expect(result).toEqual({ token: 'jwt-token' });
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(prismaService.users, 'findUnique').mockResolvedValue(null);

      await expect(service.login({ username: 'testuser', password: 'password' }))
        .rejects
        .toThrowError('user not found');
    });
  });

  describe('register', () => {
    it('should create a user and return a JWT token', async () => {
      const registerDto = { username: 'newuser', password: 'password', name: 'New User', email: 'newuser@example.com' };
      const user = { id: 1, username: 'newuser', password: await bcrypt.hash('password', 10) };
      jest.spyOn(usersService, 'createUser').mockResolvedValue(user as any);
      jest.spyOn(jwtService, 'sign').mockReturnValue('jwt-token');

      const result = await service.register(registerDto);

      expect(result).toEqual({ token: 'jwt-token' });
    });
  });
});
