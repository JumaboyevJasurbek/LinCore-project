import { TokenMiddleware } from './../../middleware/middleware.service';
import { HttpStatus } from '@nestjs/common/enums';
import { Controller, Get, Param } from '@nestjs/common';
import { UserTakeBookService } from './user-take-book.service';
import { Headers, HttpCode } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';

@Controller('userTakeBook')
@ApiTags('User Take Workbook')
export class UserTakeBookController {
  constructor(
    private readonly userTakeBookService: UserTakeBookService,
    private readonly userToken: TokenMiddleware,
  ) {}

  @Get('/get/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Headers() headers: any, @Param('id') param: string) {
    const userId = await this.userToken.verifyUser(headers);
    if (userId) {
      return await this.userTakeBookService.findOne(userId, param);
    }
  }
}
