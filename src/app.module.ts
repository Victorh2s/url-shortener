import { Module } from '@nestjs/common';
import { HttpModule } from './infrastructure/http/http.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule, DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
  ],
})
export class AppModule {}
