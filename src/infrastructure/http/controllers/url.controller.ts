import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Redirect, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { CreateUrlShortenerService } from 'src/application/services/url/create-url-shortener.service';
import { UrlShortenerDto } from '../dtos/url/url-shortener.dto';
import { RedirectToOriginalUrlService } from 'src/application/services/url/redirect-to-original-url.service';
import { GetListUrlsService } from 'src/application/services/url/get-list-urls.service';
import { UpdateUrlService } from 'src/application/services/url/update-url.service';

@Controller('url')
export class UrlController {
    constructor(
        private readonly createUrlShortenerService: CreateUrlShortenerService,
        private readonly redirectToOriginalUrlService: RedirectToOriginalUrlService,
        private readonly getListUrlsService: GetListUrlsService,
        private readonly updateUrlService: UpdateUrlService

    ) {}

    @Post('')
    async shortener(@Body() body: UrlShortenerDto, @Req() req: Request) {
        const { originalUrl  } = body

        if (!req['authUser']) {
            return await this.createUrlShortenerService.execute({ originalUrl })
        }

        const authUser = req.authUser
        const userId = authUser.id

        return await this.createUrlShortenerService.execute({ originalUrl, userId })
    }

    
    @Get('r/:shortenedUrl')
    @Redirect()
    async redirectToUrl(@Param('shortenedUrl') shortenedUrl: string) {
        const urlEntry = await this.redirectToOriginalUrlService.execute(shortenedUrl);

        return { url: urlEntry.originalUrl };
    }

    @Get('/list')
    async getListUrls(@Req() req: Request) {
        if (!req['authUser']) {
            throw new HttpException('Acesso negado.', HttpStatus.UNAUTHORIZED);
        }

        const authUser = req.authUser

        const userId = authUser.id

        const list = await this.getListUrlsService.execute(userId)

        return list
        
    }

    @Put('update/:shortenedUrl')
    async updateUrl(@Param('shortenedUrl') shortenedUrl: string, @Req() req: Request, @Body() body: UrlShortenerDto ) {

        if (!req['authUser']) {
            throw new HttpException('Acesso negado.', HttpStatus.UNAUTHORIZED);
        }

        const authUser = req.authUser
        const userId = authUser.id

        const { originalUrl } = body

        const updated = await this.updateUrlService.execute({userId, shortenedUrl, originalUrl})

        return updated
    }

   
  
}

