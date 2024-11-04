import { NestFactory, Routes } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);

  const routes: Routes = app.getHttpAdapter().getInstance()._router.stack
    .filter((layer) => layer.route) 
    .map((layer) => layer.route);

  console.log(routes);
}
bootstrap();
