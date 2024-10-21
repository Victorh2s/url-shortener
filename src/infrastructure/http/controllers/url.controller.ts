import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Redirect, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { UrlShortenerDto } from '../dtos/url/url-shortener.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUrlShortenerService } from '@/application/services/url/create-url-shortener.service';
import { RedirectToOriginalUrlService } from '@/application/services/url/redirect-to-original-url.service';
import { GetListUrlsService } from '@/application/services/url/get-list-urls.service';
import { UpdateUrlService } from '@/application/services/url/update-url.service';
import { DeleteUrlService } from '@/application/services/url/delete-url.service';

@ApiTags("url")
@Controller('url')
export class UrlController {
    constructor(
        private readonly createUrlShortenerService: CreateUrlShortenerService,
        private readonly redirectToOriginalUrlService: RedirectToOriginalUrlService,
        private readonly getListUrlsService: GetListUrlsService,
        private readonly updateUrlService: UpdateUrlService,
        private readonly deleteUrlService: DeleteUrlService

    ) { }

    @Post('shorten')
    @ApiOperation({ summary: 'Encurtar uma URL', description: 'Recebe uma URL de origem e retorna uma versão encurtada. O token de autenticação é opcional.' })
    @ApiBearerAuth()
    async shortener(@Body() body: UrlShortenerDto, @Req() req: Request) {
        const { originalUrl } = body

        if (!req['authUser']) {
            return await this.createUrlShortenerService.execute({ originalUrl })
        }

        const authUser = req.authUser
        const userId = authUser.id

        return await this.createUrlShortenerService.execute({ originalUrl, userId })
    }


    @Get('r/:shortenedUrl')
    @ApiOperation({ summary: 'Redirecionar uma URL encurtada', description: 'Recebe uma URL encurtada e redireciona para a URL original, contabilizando os cliques.' })
    @Redirect()
    async redirectToUrl(@Param('shortenedUrl') shortenedUrl: string) {
        const urlEntry = await this.redirectToOriginalUrlService.execute(shortenedUrl);

        return { url: urlEntry.originalUrl };
    }

    @Get('/list')
    @ApiOperation({ summary: 'Listar URLs encurtadas', description: 'Lista todas as URLs encurtadas criadas pelo usuário autenticado, junto com a contagem de cliques.' })
    @ApiBearerAuth()
    async getListUrls(@Req() req: Request) {
        if (!req['authUser']) {
            throw new HttpException('Acesso negado.', HttpStatus.UNAUTHORIZED);
        }

        const authUser = req.authUser

        const userId = authUser.id

        const list = await this.getListUrlsService.execute(userId)

        return list

    }

    @Patch('update/:shortenedUrl')
    @ApiOperation({
        summary: 'Atualizar URL de origem',
        description: 'Atualiza a URL original associada a um link encurtado.'
    })
    @ApiBearerAuth()
    async updateUrl(@Param('shortenedUrl') shortenedUrl: string, @Req() req: Request, @Body() body: UrlShortenerDto) {

        if (!req['authUser']) {
            throw new HttpException('Acesso negado.', HttpStatus.UNAUTHORIZED);
        }

        const authUser = req.authUser
        const userId = authUser.id

        const { originalUrl } = body

        const updated = await this.updateUrlService.execute({ userId, shortenedUrl, originalUrl })

        return updated
    }

    @Delete('delete/:shortenedUrl')
    @ApiOperation({
        summary: 'Deletar URL encurtada',
        description: 'Deleta um link encurtado associado ao usuário autenticado.'
    })
    @ApiBearerAuth()
    async deleteUrl(@Param('shortenedUrl') shortenedUrl: string, @Req() req: Request) {

        if (!req['authUser']) {
            throw new HttpException('Acesso negado', HttpStatus.UNAUTHORIZED);
        }

        const authUser = req.authUser
        const userId = authUser.id


        const deleted = await this.deleteUrlService.execute({ userId, shortenedUrl })

        return deleted

    }


}

