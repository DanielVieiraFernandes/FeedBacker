import { DatabaseModule } from '@faker-js/faker/.';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
})
export class HttpModule {}
