import { IUrlShortener, UrlRepository } from '@/application/repositories/url-repository';
import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';


@Injectable()
export class CreateUrlShortenerService {
    constructor(
        private  urlRepository: UrlRepository
    ) {}

    async execute({originalUrl, userId}: IUrlShortener ) {

        const shortenedUrl = await this.generateShortenedUrl(5)

        const newShortenedUrl = await this.urlRepository.createShortenedUrl({
            originalUrl,
            shortenedUrl,
            userId
        })


        return {
            shortenedUrl: `http://localhost:3000/url/r/${newShortenedUrl.shortenedUrl}`
        }
    }

    private async generateShortenedUrl( length: number): Promise<string> {
        let shortenedUrl: string;

        do {
            const bytes = randomBytes(Math.ceil(length * 3 / 4)); 
            shortenedUrl = bytes.toString('base64url').substring(0, length); 
        } while (await this.urlRepository.findExistingShortenedUrl(shortenedUrl));
    
        return shortenedUrl; 
    }
}
