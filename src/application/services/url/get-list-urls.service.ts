import { UrlRepository } from '@/application/repositories/url-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetListUrlsService {
    constructor(
        private  urlRepository: UrlRepository,
    ) {}

    async execute( userId: string ) {
        

        return await this.urlRepository.findManyUrls(userId)
        
    }
 
}
