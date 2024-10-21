import { InMemoryUrlRepository } from '@/infrastructure/database/in-memory/in-memory-url-repository';
import { DeleteUrlService } from './delete-url.service';
import { HttpException } from '@nestjs/common';

describe('Delete Url', () => {
  let inMemoryUrlRepository: InMemoryUrlRepository;
  let deleteUrlService: DeleteUrlService;

  beforeEach(() => {
    inMemoryUrlRepository = new InMemoryUrlRepository();
    deleteUrlService = new DeleteUrlService(inMemoryUrlRepository);
  });

  it('should be defined', () => {
    expect(deleteUrlService).toBeDefined();
  });

  it('should find and delete url by shortenedUrl ', async () => {
    const originalUrl = 'https://teddydigital.io/';
    const shortenedUrl = 'abcde'
    const userId = 'userId';

    inMemoryUrlRepository.createShortenedUrl({
        userId,
        originalUrl,
        shortenedUrl
    })
    
    const result = await deleteUrlService.execute({ shortenedUrl, userId});

    expect(result.message).toBe("Url deletada com sucesso.")
  });

  it('should throw an error when trying to delete a non-existing URL', async () => {
    const shortenedUrl = 'abcde'
    const userId = 'userId';

    await expect(deleteUrlService.execute({ shortenedUrl, userId})).rejects.toThrow(HttpException);
  });

});
