import { IsEmail, isEmail, IsNotEmpty, IsUrl, isURL, Length, Matches, MinLength } from "class-validator"

export class UrlShortenerDto {

    @IsNotEmpty({
        message: "O campo originalUrl precisa ser preenchido."
    })

    @IsUrl({}, 
        { 
            message: 'A URL fornecida não é válida.' 
        }) 

    originalUrl : string 
}