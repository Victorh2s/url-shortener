import { IsEmail, IsNotEmpty, Length, Matches, MinLength } from "class-validator"

export class RegisterUserDto {

    @IsNotEmpty({
        message: "O campo username precisa ser preenchido."
    })

    @Length(5,12, {
        message: "O campo username precisa ter entre 5 a 12 caracteres"
    })
    username: string 


    @IsNotEmpty({
        message: "O campo email precisa ser preenchido."
    })
    @IsEmail({}, {
        message: "O campo email precisa conter um email válido.",
    })
    email: string


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