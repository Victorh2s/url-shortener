import { Injectable } from '@nestjs/common';
import { IDeleteUrl, UrlRepository } from '../../repositories/url-repository';

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
