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
   
}