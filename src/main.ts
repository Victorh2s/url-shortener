import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Url-shortener')
  .setDescription(`
&nbsp;&nbsp;&nbsp;&nbsp;A aplicação **Url-shortener** permite aos usuários:
- Criar URLs encurtados
- Gerenciar URLs encurtados (listar, atualizar, deletar)
- Acompanhar o número de cliques em URLs encurtados
- Redirecionar URLs encurtados para a URL de origem.

&nbsp;&nbsp;&nbsp;&nbsp;A API possui suporte para autenticação baseada em Bearer Token, e oferece endpoints que aceitam tanto requisições autenticadas quanto não autenticadas.
  `)
  .setExternalDoc('Veja mais em', 'https://github.com/Victorh2s/url-shortener')
  .setVersion('1.0')
  .addBearerAuth() 
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
