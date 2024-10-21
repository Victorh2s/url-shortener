import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Redirect, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { CreateUrlShortenerService } from 'src/application/services/url/create-url-shortener.service';
import { UrlShortenerDto } from '../dtos/url/url-shortener.dto';

@Controller('url')
export class UrlController {
    constructor(
        private readonly createUrlShortenerService: CreateUrlShortenerService,
        
    ) {}

    @Post('')
    async shortener(@Body() body: UrlShortenerDto, @Req() req: Request) {
        const { originalUrl  } = body

        return await this.createUrlShortenerService.execute({ originalUrl })
    }

   
  
}

