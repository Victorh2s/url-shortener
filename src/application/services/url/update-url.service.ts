import { Injectable } from '@nestjs/common';
import { IUpdateUrl, UrlRepository } from '../../repositories/url-repository';


@Injectable()
export class UpdateUrlService {
    constructor(
        private  urlRepository: UrlRepository
    ) {}

    async execute({userId, shortenedUrl, originalUrl}: IUpdateUrl) {


        await this.urlRepository.updateUrl({
            userId,
            shortenedUrl,
            originalUrl
        })

        return {
            message: "URL de origem atualizada com sucesso."
        }
    }
}
