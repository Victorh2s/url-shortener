import { InMemoryUrlRepository } from '@/infrastructure/database/in-memory/in-memory-url-repository';
import { UpdateUrlService } from './update-url.service';
import { HttpException } from '@nestjs/common';

describe('Update Url', () => {
  let inMemoryUrlRepository: InMemoryUrlRepository;
  let updateUrlService: UpdateUrlService;

  beforeEach(() => {
    inMemoryUrlRepository = new InMemoryUrlRepository();
    updateUrlService = new UpdateUrlService(inMemoryUrlRepository);
  });

  it('should update an existing URL successfully', async () => {
    const originalUrl = 'https://teddydigital.io';
    const shortenedUrl = 'abcde';
    const userId = 'userId';
    
    inMemoryUrlRepository.items.push({
      id: '1',
      originalUrl,
      shortenedUrl,
      clickCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      userId,
    });

    const newOriginalUrl = 'https://teddydigital.io/sobre';

    const result = await updateUrlService.execute({
      userId,
      shortenedUrl,
      originalUrl: newOriginalUrl,
    });

    const updatedUrl = inMemoryUrlRepository.items.find(url => url.shortenedUrl === shortenedUrl);
    expect(updatedUrl?.originalUrl).toBe(newOriginalUrl);
    expect(result.message).toBe('URL de origem atualizada com sucesso.');
  });

  it('should throw an error when trying to update a non-existing URL', async () => {
    const originalUrl = 'https://teddydigital.io';
    const shortenedUrl = 'abcde';
    const userId = 'userId';

    await expect(updateUrlService.execute({
      userId,
      shortenedUrl,
      originalUrl,
    })).rejects.toThrow(HttpException);
  });

});
