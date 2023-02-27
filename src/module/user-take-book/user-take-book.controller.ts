import { TokenMiddleware } from './../../middleware/middleware.service';
import { HttpStatus } from '@nestjs/common/enums';
import { Controller, Get } from '@nestjs/common';
import { UserTakeBookService } from './user-take-book.service';
import { Headers, HttpCode, Param, Res } from '@nestjs/common/decorators';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('user-take-workbook')
@ApiTags('User Take Workbook')
export class UserTakeBookController {
  constructor(
    private readonly userTakeBookService: UserTakeBookService,
    private readonly userToken: TokenMiddleware,
  ) {}

  @Get('/:id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiHeader({
    name: 'user_token',
    description: 'User token',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id') id: string,
    @Headers() headers: any,
    @Res() res: Response,
  ) {
    const userId = await this.userToken.verifyUser(headers);
    if (userId) {
      return await this.userTakeBookService.findOne(id, userId, res);
    }
  }
}
