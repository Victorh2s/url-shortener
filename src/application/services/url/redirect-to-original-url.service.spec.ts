import { InMemoryUrlRepository } from '@/infrastructure/database/in-memory/in-memory-url-repository';
import { RedirectToOriginalUrlService } from './redirect-to-original-url.service';

describe('Redirect To Original Url', () => {
  let inMemoryUrlRepository: InMemoryUrlRepository;
  let redirectToOriginalUrlService: RedirectToOriginalUrlService;

  beforeEach(() => {
    inMemoryUrlRepository = new InMemoryUrlRepository();
    redirectToOriginalUrlService = new RedirectToOriginalUrlService(inMemoryUrlRepository);
  });

  it('should be defined', () => {
    expect(redirectToOriginalUrlService).toBeDefined();
  });

  it('should find url by shortenedUrl', async () => {
    const originalUrl = 'https://teddydigital.io/';
    const shortenedUrl = 'abcde'
    const userId = 'userId';

    inMemoryUrlRepository.createShortenedUrl({
        userId,
        originalUrl,
        shortenedUrl
    })
    
    const result = await redirectToOriginalUrlService.execute(shortenedUrl);

    expect(result).toHaveProperty('shortenedUrl');
    expect(result.shortenedUrl).toContain(shortenedUrl);
  });

  it('should increment count of click', async () => {
    const originalUrl = 'https://teddydigital.io/';
    const shortenedUrl = 'abcde'
    const userId = 'userId';

    inMemoryUrlRepository.createShortenedUrl({
        userId,
        originalUrl,
        shortenedUrl
    })
    const result = await redirectToOriginalUrlService.execute(shortenedUrl);

    expect(result.clickCount).toBe(1)
  });

});
