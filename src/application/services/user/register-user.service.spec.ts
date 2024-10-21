import { InMemoryUserRepository } from '@/infrastructure/database/in-memory/in-memory-user-repository';
import { HttpException } from '@nestjs/common';
import { RegisterUserService } from './register-user.service';


describe('Register User', () => {
  let inMemoryUserRepository: InMemoryUserRepository
  let registerUserService: RegisterUserService

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
 
    registerUserService = new RegisterUserService(inMemoryUserRepository)
  })

  it('should be defined', () => {
    expect(registerUserService).toBeDefined();
  });

  it('should register a new user successfully', async () => {
    const userDto = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'Senha@123456',
    };

    const result = await registerUserService.execute(userDto);

    expect(result).toEqual({ message: 'Usuário criado' });
    expect(inMemoryUserRepository.items.length).toBe(1);
  });

  it('should hash the user password before saving', async () => {
    const userDto = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'Senha@123456',
    };
    
    await registerUserService.execute(userDto);

    const savedUser = inMemoryUserRepository.items.find(user => user.email === userDto.email);

    expect(savedUser).toBeDefined();
    expect(savedUser?.password).not.toBe(userDto.password);
  });

  it('should throw an error if email already exists', async () => {
    const userDto = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'Senha@123456',
    };

    await registerUserService.execute(userDto);

    await expect(registerUserService.execute(userDto)).rejects.toThrow(HttpException);
  });

  it('should throw an error if username already exists', async () => {
    const userDto1 = {
      username: 'testuser',
      email: 'test1@example.com',
      password: 'Senha@123456',
    };

    const userDto2 = {
      username: 'testuser',
      email: 'test2@example.com',
      password: 'Senha@123456',
    };

    await registerUserService.execute(userDto1);

    await expect(registerUserService.execute(userDto2)).rejects.toThrow(HttpException);
  });
  
});
