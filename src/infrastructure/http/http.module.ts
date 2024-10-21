import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { RegisterUserService } from '../../application/services/auth/register-user.service';
import { AuthenticateUserService } from 'src/application/services/auth/authenticate-user.service';
import { JwtModule } from '@nestjs/jwt';
import { UrlController } from './controllers/url.controller';
import { CreateUrlShortenerService } from 'src/application/services/url/create-url-shortener.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { RedirectToOriginalUrlService } from 'src/application/services/url/redirect-to-original-url.service';
import { GetListUrlsService } from 'src/application/services/url/get-list-urls.service';
import { UpdateUrlService } from 'src/application/services/url/update-url.service';


@Module({
  imports: [DatabaseModule,
    JwtModule.register({
        secret: process.env.TOKEN_SECRET,
        signOptions: { expiresIn: process.env.TOKEN_EXPIRATION }, 
      }),
  ],
  controllers: [AuthController, UrlController],
  providers: [
    RegisterUserService,
    AuthenticateUserService,
    CreateUrlShortenerService,
    RedirectToOriginalUrlService,
    GetListUrlsService,
    UpdateUrlService,
    LoggerMiddleware
  ],
})
export class HttpModule {}
