import { Injectable } from '@nestjs/common';
import { UrlRepository } from '../../repositories/url-repository';

@Injectable()
export class RedirectToOriginalUrlService {
    constructor(
        private  urlRepository: UrlRepository,
    ) {}

    async execute( shortenedUrl: string ) {
        return await this.urlRepository.findUrlForRedirect(shortenedUrl)
    }
 
}
