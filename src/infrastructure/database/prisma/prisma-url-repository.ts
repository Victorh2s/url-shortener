import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from "./prisma.service";
import { ICreateUrlShortener, IDeleteUrl, IUpdateUrl, UrlRepository } from 'src/application/repositories/url-repository';

@Injectable()
export class PrismaUrlRepository implements UrlRepository {
    constructor(private prisma: PrismaService) {}

    async createShortenedUrl({ originalUrl, shortenedUrl, userId }: ICreateUrlShortener) {
        
        const newUrl = await this.prisma.url.create({
            data:{
                originalUrl,
                shortenedUrl,
                userId: userId ? userId : null
            },
        })

        return newUrl
    }

    async findExistingShortenedUrl(shortenedUrl: string) {
        const url = await this.prisma.url.findFirst({
            where:{
                shortenedUrl,
                deletedAt: null,
            }
        })

        return url
    }
   
    async findUrlForRedirect(shortenedUrl: string){
        const url = await this.prisma.url.findFirst({
            where:{
                shortenedUrl,
                deletedAt: null,
            }
        })

        if(!url) throw new HttpException('Essa URL não foi encontrada.', HttpStatus.NOT_FOUND);

        await this.prisma.url.update({
            where: {
                shortenedUrl,
                deletedAt: null,
            },
            data:{
                clickCount: {
                    increment: 1
                }
            }
        })

        return url
    }

    async findManyUrls(userId: string){

        return await this.prisma.url.findMany({
            where:{
                userId,
                deletedAt: null,
            },
        })

    }

    async updateUrl({userId, shortenedUrl, originalUrl}: IUpdateUrl) {

        const findUrl = await this.prisma.url.findUnique({
            where:{
                userId,
                shortenedUrl,
                deletedAt: null,
            }
        })

        if(!findUrl) throw new HttpException('Essa URL não foi encontrada.', HttpStatus.NOT_FOUND);

        await this.prisma.url.update({
            where:{
                userId,
                shortenedUrl,
                deletedAt: null,
            },
            data:{
                originalUrl
            }
        })

        return
    }
}