import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from '../dtos/user/register-user.dto';
import { RegisterUserService } from 'src/application/services/user/register-user.service';
import { LoginUserDto } from '../dtos/user/login-user.dto';
import { AuthenticateUserService } from 'src/application/services/user/authenticate-user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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

