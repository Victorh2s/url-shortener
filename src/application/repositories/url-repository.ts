export interface ICreateUrlShortener {
    originalUrl: string;
    shortenedUrl: string;
    userId?: string
}

export interface IDeleteUrl {
    userId: string 
    shortenedUrl: string
}

export interface IUrlShortener{
    originalUrl: string;
    userId?: string;
}

export interface IUpdateUrl {
    userId: string 
    shortenedUrl: string
    originalUrl: string
}


export abstract class UrlRepository {
    abstract createShortenedUrl({ originalUrl, shortenedUrl }: ICreateUrlShortener): Promise<{
        originalUrl: string;
        shortenedUrl: string;
        id: string;
        clickCount: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string | null;
    }>

    abstract findExistingShortenedUrl(shortenedUrl: string): Promise<{
        originalUrl: string;
        shortenedUrl: string;
        id: string;
        clickCount: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string | null;
    } | null>

    abstract findUrlForRedirect(shortenedUrl: string): Promise<{
        id: string;
        originalUrl: string;
        shortenedUrl: string;
        clickCount: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string | null;
    }>
}