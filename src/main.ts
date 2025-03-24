import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/app.module';
import { EnvService } from './infra/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const env = app.get(EnvService);
  const port = env.get('PORT');

  await app.listen(port);
}
bootstrap();
