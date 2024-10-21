import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { RegisterUserService } from '../../application/services/user/register-user.service';
import { JwtModule } from '@nestjs/jwt';
import { UrlController } from './controllers/url.controller';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateUserService } from '@/application/services/user/authenticate-user.service';
import { CreateUrlShortenerService } from '@/application/services/url/create-url-shortener.service';
import { RedirectToOriginalUrlService } from '@/application/services/url/redirect-to-original-url.service';
import { GetListUrlsService } from '@/application/services/url/get-list-urls.service';
import { UpdateUrlService } from '@/application/services/url/update-url.service';
import { DeleteUrlService } from '@/application/services/url/delete-url.service';


@Module({
  imports: [DatabaseModule,
    JwtModule.register({
        secret: process.env.TOKEN_SECRET,
        signOptions: { expiresIn: process.env.TOKEN_EXPIRATION }, 
      }),
  ],
  controllers: [UserController, UrlController],
  providers: [
    RegisterUserService,
    AuthenticateUserService,
    CreateUrlShortenerService,
    RedirectToOriginalUrlService,
    GetListUrlsService,
    UpdateUrlService,
    DeleteUrlService,
    LoggerMiddleware
  ],
})
export class HttpModule {}
