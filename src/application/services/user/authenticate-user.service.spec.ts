import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateUserService } from './authenticate-user.service';
import { UserRepository } from '@/application/repositories/user-repository';
import { compare } from 'bcrypt';
import { Test, TestingModule } from '@nestjs/testing';


const mockUserRepository = () => ({
    findUserByEmail: jest.fn(),
    registerUser: jest.fn(),
});

const mockJwtService = () => ({
    sign: jest.fn().mockReturnValue('jwt_token'),
    signAsync: jest.fn(),
    verify: jest.fn(),
    verifyAsync: jest.fn(),
    decode: jest.fn(),
});

jest.mock('bcrypt', () => ({
    compare: jest.fn(), 
}));


describe('Authenticate User', () => {
    let authenticateUserService: AuthenticateUserService;
    let userRepository: UserRepository;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthenticateUserService,
                { provide: UserRepository, useFactory: mockUserRepository },
                { provide: JwtService, useFactory: mockJwtService },
            ],
        }).compile();

        authenticateUserService = module.get<AuthenticateUserService>(AuthenticateUserService);
        userRepository = module.get<UserRepository>(UserRepository);
        jwtService = module.get<JwtService>(JwtService);
    });

    it('should return an access token if the credentials are valid', async () => {
        const user = {
            id: '1',
           email: 'test@example.com',
            password: 'Senha@123456',
        };

        jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(user);
        (compare as jest.Mock).mockResolvedValue(true);
        jest.spyOn(jwtService, 'sign').mockReturnValue('jwt_token');

        const result = await authenticateUserService.execute({
            email: user.email,
            password: 'Senha@123456'
        });

        //console.log(result)

        expect(result).toEqual({
            access_token: 'jwt_token',
            expiresIn: process.env.TOKEN_EXPIRATION,
            user: { id: user.id },
        });
        expect(userRepository.findUserByEmail).toHaveBeenCalledWith(user.email);
        expect(compare).toHaveBeenCalledWith('Senha@123456', user.password);
        expect(jwtService.sign).toHaveBeenCalledWith({ id: user.id });
    });

    it('should throw an error if the email is not found', async () => {

        await expect(authenticateUserService.execute({
            email: 'jhondoe@example.com',
            password: 'password@123',
        })).rejects.toThrow(TypeError);
    });

    it('should throw an error if the password is invalid', async () => {
        const user = {
            id: '1',
            email: 'test@example.com',
            password: 'Senha@123456',
        };

        jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(user);
        (compare as jest.Mock).mockResolvedValue(false);

        await expect(authenticateUserService.execute({
            email: user.email,
            password: 'Senha@654321',
        })).rejects.toThrow(HttpException);
    });
});
