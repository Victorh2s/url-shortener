import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, isEmail, IsNotEmpty, IsUrl, isURL, Length, Matches, MinLength } from "class-validator"

export class UrlShortenerDto {
    @ApiProperty({
        description: "O campo originalUrl é utilizado para gerar um novo link encurtado.",
        example:"aO1vU"
    })
    @IsNotEmpty({
        message: "O campo originalUrl precisa ser preenchido."
    })

    @IsUrl({}, 
        { 
            message: 'A URL fornecida não é válida.' 
        }) 

    originalUrl : string 
}