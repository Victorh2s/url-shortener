import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { RegisterUserService } from '../../application/services/user/register-user.service';
import { AuthenticateUserService } from 'src/application/services/user/authenticate-user.service';
import { JwtModule } from '@nestjs/jwt';
import { UrlController } from './controllers/url.controller';
import { CreateUrlShortenerService } from 'src/application/services/url/create-url-shortener.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { RedirectToOriginalUrlService } from 'src/application/services/url/redirect-to-original-url.service';
import { GetListUrlsService } from 'src/application/services/url/get-list-urls.service';
import { UpdateUrlService } from 'src/application/services/url/update-url.service';
import { DeleteUrlService } from 'src/application/services/url/delete-url.service';


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
