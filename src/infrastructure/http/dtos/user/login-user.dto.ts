import { IsEmail, isEmail, IsNotEmpty, Length, Matches, MinLength } from "class-validator"

export class LoginUserDto {

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
    password: string

}