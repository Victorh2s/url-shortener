import { InMemoryUrlRepository } from '@/infrastructure/database/in-memory/in-memory-url-repository';
import { GetListUrlsService } from './get-list-urls.service';

describe('Get List Urls', () => {
  let inMemoryUrlRepository: InMemoryUrlRepository;
  let getListUrlsService: GetListUrlsService;

  beforeEach(() => {
    inMemoryUrlRepository = new InMemoryUrlRepository();
    getListUrlsService = new GetListUrlsService(inMemoryUrlRepository);
  });

  it('should get all URLs of a user in the system', async () => {

    const userId = 'userId';
    
  inMemoryUrlRepository.items.push({
    id: '1',
    originalUrl: 'https://teddydigital.io',
    shortenedUrl: 'abcde',
    clickCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    userId,
  });
  
  inMemoryUrlRepository.items.push({
    id: '2',
    originalUrl: 'https://teddydigital.io/sobre',
    shortenedUrl: 'fghij',
    clickCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    userId,
  });


    const result = await getListUrlsService.execute(userId);


    expect(result).toHaveLength(2);
    expect(result[0].originalUrl).toBe('https://teddydigital.io');
    expect(result[1].originalUrl).toBe('https://teddydigital.io/sobre');

  });

});
