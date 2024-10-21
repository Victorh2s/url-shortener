import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/prisma-user-repository';
import { UserRepository } from '../../application/repositories/user-repository';

@Module({
    providers: [
      PrismaService,
      {
        provide: UserRepository,
        useClass: PrismaUserRepository,
      }
    ],
    exports: [UserRepository],
  })
  export class DatabaseModule {}