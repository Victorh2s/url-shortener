import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from '../dtos/auth/register-user.dto';
import { RegisterUserService } from 'src/application/services/auth/register-user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly registerUser: RegisterUserService,
    ) {}

    @Post('register')
    async register(@Body() body: RegisterUserDto) {
        const { username, email, password} = body

        return await this.registerUser.execute({ username, email, password});
    }

}

