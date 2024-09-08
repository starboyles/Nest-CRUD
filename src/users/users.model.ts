import { Prisma } from "@prisma/client";

export class Users implements Prisma.UserCreateInput {
    name: string;
    password: string;
    username: string;
    email: string;
} 