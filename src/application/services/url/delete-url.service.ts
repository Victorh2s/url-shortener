import { IDeleteUrl, UrlRepository } from '@/application/repositories/url-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUrlService {
    constructor(
        private  urlRepository: UrlRepository,
    ) {}

    async execute( {userId, shortenedUrl}: IDeleteUrl ) {
        
        await this.urlRepository.deleteUrl({userId, shortenedUrl})

        return {
            message: "Url deletada com sucesso."
        }
    }
 
}
