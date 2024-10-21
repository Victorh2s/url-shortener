import { UrlRepository } from '@/application/repositories/url-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedirectToOriginalUrlService {
    constructor(
        private  urlRepository: UrlRepository,
    ) {}

    async execute( shortenedUrl: string ) {
        return await this.urlRepository.findUrlForRedirect(shortenedUrl)
    }
 
}
