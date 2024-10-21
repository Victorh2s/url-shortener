import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare  } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IAuthenticateUser, UserRepository } from '@/application/repositories/user-repository';

@Injectable()
export class AuthenticateUserService {
    constructor(
        private  userRepository: UserRepository,
        private  jwtService: JwtService
    ) {}

    async execute({ email, password}: IAuthenticateUser) {
        
        const user = await this.userRepository.findUserByEmail(email)

        if (!(await compare(password, user.password))) {
            throw new HttpException('Email ou senha inválidos.', HttpStatus.UNAUTHORIZED);
        }

        const { id } = user

        const {token, expiresIn} = this.generateToken(id)

        
        return {
            access_token: token,
            expiresIn,
            user: {
                id
            }
        }
    }

    private generateToken(userId: string) {

        const token = this.jwtService.sign({ id: userId });
      
          return { token, expiresIn: process.env.TOKEN_EXPIRATION };
    }
}
