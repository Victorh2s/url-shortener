import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { RegisterUserService } from '../../application/services/auth/register-user.service';
import { AuthenticateUserService } from 'src/application/services/auth/authenticate-user.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [DatabaseModule,
    JwtModule.register({
        secret: process.env.TOKEN_SECRET,
        signOptions: { expiresIn: process.env.TOKEN_EXPIRATION }, 
      }),
  ],
  controllers: [AuthController],
  providers: [
    RegisterUserService,
    AuthenticateUserService
  ],
})
export class HttpModule {}
