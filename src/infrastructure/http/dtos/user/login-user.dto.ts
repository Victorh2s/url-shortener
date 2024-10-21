import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, isEmail, IsNotEmpty, Length, Matches, MinLength } from "class-validator"

export class LoginUserDto {

    @ApiProperty({
        description: "O campo email é utilizado para autenticação do usuário.",
        example:"teste@gmail.com"
    })
    @IsNotEmpty({
        message: "O campo email precisa ser preenchido."
    })
    @IsEmail({}, {
        message: "O campo email precisa conter um email válido.",
    })
    email: string

    @ApiProperty({
        description: "O campo password é utilizado para autenticação do usuário.",
        example:"Senha$123456"
    })
    @IsNotEmpty({
        message: "O campo password precisa ser preenchido."
    })
    password: string

}