import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from '../dtos/user/register-user.dto';
import { LoginUserDto } from '../dtos/user/login-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterUserService } from '@/application/services/user/register-user.service';
import { AuthenticateUserService } from '@/application/services/user/authenticate-user.service';

@ApiTags("user")
@Controller('user')
export class UserController {
    constructor(
        private readonly registerUser: RegisterUserService,
        private readonly authenticateUser: AuthenticateUserService
    ) {}

    @Post('register')
    @ApiOperation({ 
        summary: 'Registrar um novo usuário', 
        description: 'Este endpoint permite que novos usuários se registrem fornecendo um nome de usuário, e-mail e senha.'
    })
    async register(@Body() body: RegisterUserDto) {
        const { username, email, password} = body

        return await this.registerUser.execute({ username, email, password});
    }

    @Post('login')
    @ApiOperation({ 
        summary: 'Login do usuário', 
        description: 'Este endpoint permite que usuários existentes façam login utilizando seu e-mail e senha.'
    })
    async login(@Body() body: LoginUserDto) {
        const { email, password } = body

        return await this.authenticateUser.execute({ email, password});
    }

}

