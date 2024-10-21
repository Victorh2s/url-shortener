import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from "./prisma.service";
import { IRegisterUser, UserRepository } from 'src/application/repositories/user-repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private prisma: PrismaService) {}

    async registerUser(newUser: IRegisterUser): Promise<void> {

        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { email: newUser.email },
                    { username: newUser.username }
                ],
            },
            select: { email: true, username: true }
        });

        if (existingUser) {
            if (existingUser.email === newUser.email) {
                throw new HttpException('Email já registrado.', HttpStatus.CONFLICT);
            } else if (existingUser.username === newUser.username) {
                throw new HttpException('Nome de usuário já em uso.', HttpStatus.CONFLICT);
            }
        }

        await this.prisma.user.create({
            data: newUser
        });

        return;
    }

    async findUserByEmail(email: string): Promise<{
        id: string
        email: string;
        password: string;
    }> {
        const user =  await this.prisma.user.findUnique({
            where:{
                email,
            },
            select: {id: true, email: true, password: true}
        })

        if (!user) throw new HttpException('Esse usuário não existe.', HttpStatus.NOT_FOUND);

        return user
    }
   
}