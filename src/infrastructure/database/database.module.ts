import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/prisma-user-repository';
import { UserRepository } from '../../application/repositories/user-repository';
import { UrlRepository } from 'src/application/repositories/url-repository';
import { PrismaUrlRepository } from './prisma/prisma-url-repository';

@Module({
    providers: [
      PrismaService,
      {
        provide: UserRepository,
        useClass: PrismaUserRepository,
      },
      {
        provide: UrlRepository,
        useClass: PrismaUrlRepository,
      },
    ],
    exports: [UserRepository, UrlRepository],
  })
  export class DatabaseModule {}