import { IRegisterUser, UserRepository } from '@/application/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

@Injectable()
export class RegisterUserService {
    constructor(
        private  userRepository: UserRepository
    ) {}

    async execute({username, email, password}: IRegisterUser) {

        const passwordHash = await hash(password, 6);

        const newUser = {
            username,
            email,
            password: passwordHash
        }

        await this.userRepository.registerUser(newUser)
        return {
            message:"Usuário criado"
        }
    }
}
