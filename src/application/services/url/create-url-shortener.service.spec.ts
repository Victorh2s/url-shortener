import { CreateUrlShortenerService } from './create-url-shortener.service';
import { InMemoryUrlRepository } from '@/infrastructure/database/in-memory/in-memory-url-repository';

describe('Create Url Shortener Service', () => {
  let inMemoryUrlRepository: InMemoryUrlRepository;
  let createUrlShortenerService: CreateUrlShortenerService;

  beforeEach(() => {
     process.env.BASE_URL = 'http://localhost:3000'
    inMemoryUrlRepository = new InMemoryUrlRepository();
    createUrlShortenerService = new CreateUrlShortenerService(inMemoryUrlRepository);
  });

  it('should be defined', () => {
    expect(createUrlShortenerService).toBeDefined();
  });

  it('should create a new shortened URL', async () => {
    const originalUrl = 'https://teddydigital.io/';
    const userId = 'userId';

    const result = await createUrlShortenerService.execute({ originalUrl, userId });

    expect(result).toHaveProperty('shortenedUrl');
    expect(result.shortenedUrl).toContain('http://localhost:3000/url/r/');
    
    const savedUrl = await inMemoryUrlRepository.findExistingShortenedUrl(result.shortenedUrl.split('/').pop()!);
    expect(savedUrl).toBeDefined();
    expect(savedUrl?.originalUrl).toBe(originalUrl);
    expect(savedUrl?.userId).toBe(userId);
  });

  it('should generate a unique shortened URL', async () => {
    const originalUrl1 = 'https://teddydigital.io/';
    const originalUrl2 = 'https://teddydigital.io/sobre';
    const userId = 'userId';

    const result1 = await createUrlShortenerService.execute({ originalUrl: originalUrl1, userId });

    const result2 = await createUrlShortenerService.execute({ originalUrl: originalUrl2, userId });

    const shortenedUrl1 = result1.shortenedUrl.split('/').pop()!;
    const shortenedUrl2 = result2.shortenedUrl.split('/').pop()!;
    expect(shortenedUrl1).not.toBe(shortenedUrl2);

    const savedUrl1 = await inMemoryUrlRepository.findExistingShortenedUrl(shortenedUrl1);
    const savedUrl2 = await inMemoryUrlRepository.findExistingShortenedUrl(shortenedUrl2);
    
    expect(savedUrl1).toBeDefined();
    expect(savedUrl2).toBeDefined();
  });

});
