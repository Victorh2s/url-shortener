import { IRegisterUser, UserRepository } from '@/application/repositories/user-repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'; 

@Injectable()
export class InMemoryUserRepository implements UserRepository {
    public items: Array<{
        id: string;
        email: string;
        username: string;
        password: string;
    }> = []

    async registerUser(newUser: IRegisterUser): Promise<void> {

        const existingUser = this.items.find(user => 
            user.email === newUser.email || user.username === newUser.username
        );

        if (existingUser) {
            if (existingUser.email === newUser.email) {
                throw new HttpException('Email já registrado.', HttpStatus.CONFLICT);
            } else if (existingUser.username === newUser.username) {
                throw new HttpException('Nome de usuário já em uso.', HttpStatus.CONFLICT);
            }
        }

        this.items.push({
            id: uuidv4(),
            email: newUser.email,
            username: newUser.username,
            password: newUser.password,
        });

        return;
    }

    async findUserByEmail(email: string): Promise<{
        id: string;
        email: string;
        password: string;
    }> {
        const user = this.items.find(user => user.email === email);

        if (!user) {
            throw new HttpException('Esse usuário não existe.', HttpStatus.NOT_FOUND);
        }

        return {
            id: user.id,
            email: user.email,
            password: user.password,
        };
    }
   
}