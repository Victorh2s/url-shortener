import { ICreateUrlShortener, IDeleteUrl, IUpdateUrl, UrlRepository } from '@/application/repositories/url-repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'; 

@Injectable()
export class InMemoryUrlRepository implements UrlRepository {
    public items: Array<{
        id: string;
        originalUrl: string;
        shortenedUrl: string;
        clickCount: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string | null;
    }> = []

    async createShortenedUrl({ originalUrl, shortenedUrl, userId }: ICreateUrlShortener) {
        
        const newUrl = {
            id: uuidv4(), 
            originalUrl,
            shortenedUrl,
            clickCount: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            userId: userId ? userId : null,
        };

        this.items.push(newUrl); 
        return newUrl;
    }

    async findExistingShortenedUrl(shortenedUrl: string) {
        return this.items.find(url => url.shortenedUrl === shortenedUrl && url.deletedAt === null) || null;
    }
   
    async findUrlForRedirect(shortenedUrl: string){
        const url = await this.findExistingShortenedUrl(shortenedUrl);

        if (!url) throw new HttpException('Essa URL não foi encontrada.', HttpStatus.NOT_FOUND);

        url.clickCount += 1;
        url.updatedAt = new Date();

        return url;
    }

    async findManyUrls(userId: string){
        return this.items.filter(url => url.userId === userId && url.deletedAt === null);
    }

    async updateUrl({userId, shortenedUrl, originalUrl}: IUpdateUrl) {
        const findUrl = this.items.find(url => url.userId === userId && url.shortenedUrl === shortenedUrl && url.deletedAt === null);

        if (!findUrl) throw new HttpException('Essa URL não foi encontrada.', HttpStatus.NOT_FOUND);

        findUrl.originalUrl = originalUrl; 
        findUrl.updatedAt = new Date();
    }

    async deleteUrl({userId, shortenedUrl}: IDeleteUrl) {

        const findUrl = this.items.find(url => url.userId === userId && url.shortenedUrl === shortenedUrl && url.deletedAt === null);

        if (!findUrl) throw new HttpException('Essa URL não foi encontrada.', HttpStatus.NOT_FOUND);

        findUrl.deletedAt = new Date();
    }
   
}