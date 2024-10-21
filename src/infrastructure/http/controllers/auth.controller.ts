import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from '../dtos/auth/register-user.dto';
import { RegisterUserService } from 'src/application/services/auth/register-user.service';
import { LoginUserDto } from '../dtos/auth/login-user.dto';
import { AuthenticateUserService } from 'src/application/services/auth/authenticate-user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly registerUser: RegisterUserService,
        private readonly authenticateUser: AuthenticateUserService
    ) {}

    @Post('register')
    async register(@Body() body: RegisterUserDto) {
        const { username, email, password} = body

        return await this.registerUser.execute({ username, email, password});
    }

    @Post('login')
    async login(@Body() body: LoginUserDto) {
        const { email, password } = body

        return await this.authenticateUser.execute({ email, password});
    }

}

