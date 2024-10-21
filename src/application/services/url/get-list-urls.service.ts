import { Injectable } from '@nestjs/common';
import { UrlRepository } from '../../repositories/url-repository';

@Injectable()
export class GetListUrlsService {
    constructor(
        private  urlRepository: UrlRepository,
    ) {}

    async execute( userId: string ) {
        

        return await this.urlRepository.findManyUrls(userId)
        
    }
 
}
