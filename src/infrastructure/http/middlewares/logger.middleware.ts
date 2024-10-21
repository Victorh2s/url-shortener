import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

interface TokenPayLoad {
    id: string;
    iat: number;
    exp: number;
  }

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}


    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
    
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
           return next(); 
        }
    
        const token = authHeader.split(' ')[1];
    
        try {
          const decoded = this.jwtService.verify<TokenPayLoad>(token);

          req['authUser'] = decoded; 
        } catch (error) {
            throw new HttpException(`Erro no sistema: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        next(); 
      }
    }
