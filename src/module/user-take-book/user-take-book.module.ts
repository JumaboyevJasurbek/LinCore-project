import { TokenMiddleware } from './../../middleware/middleware.service';
import { Module } from '@nestjs/common';
import { UserTakeBookService } from './user-take-book.service';
import { UserTakeBookController } from './user-take-book.controller';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // path to your static files directory
    }),
  ],
  controllers: [UserTakeBookController],
  providers: [UserTakeBookService, TokenMiddleware],
})
export class UserTakeBookModule {}
