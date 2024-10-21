import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { IRegisterUser, UserRepository } from 'src/application/repositories/user-repository';

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
