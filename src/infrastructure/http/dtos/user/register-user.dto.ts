import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, Length, Matches, MinLength } from "class-validator"

export class RegisterUserDto {
    
    @ApiProperty({
        description: "O campo username é utilizado para identificação do usuário dentro da plataforma.",
        example:"teddy_open"
    })
    @IsNotEmpty({
        message: "O campo username precisa ser preenchido."
    })

    @Length(5,12, {
        message: "O campo username precisa ter entre 5 a 12 caracteres"
    })

    @Matches(/^[a-zA-Z0-9._-]+$/, {
        message: "O campo username pode conter apenas letras, números, pontos, sublinhados e hífens."
    })

    username: string 

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
    @Length(8,25 ,{
        message: "O campo password precisa ter entre 8 a 25 caracteres."
    })

    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: "A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial.",
      })
    password: string
}