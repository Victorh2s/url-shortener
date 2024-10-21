import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { RegisterUserService } from '../../application/services/auth/register-user.service';


@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    RegisterUserService,
  ],
})
export class HttpModule {}
