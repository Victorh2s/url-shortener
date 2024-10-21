import { IUpdateUrl, UrlRepository } from '@/application/repositories/url-repository';
import { Injectable } from '@nestjs/common';


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
