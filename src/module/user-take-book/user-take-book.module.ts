import { TokenMiddleware } from './../../middleware/middleware.service';
import { UserTakeWorkbook } from './../../entities/user_take_workbook.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserTakeBookService } from './user-take-book.service';
import { UserTakeBookController } from './user-take-book.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserTakeWorkbook])],
  controllers: [UserTakeBookController],
  providers: [UserTakeBookService, TokenMiddleware]
})
export class UserTakeBookModule {}
