import { TokenMiddleware } from './../../middleware/middleware.service';
import { HttpStatus } from '@nestjs/common/enums';
import { Controller, Get, HttpException } from '@nestjs/common';
import { UserTakeBookService } from './user-take-book.service';
import { Headers, HttpCode } from '@nestjs/common/decorators';
import fs from 'fs';
import jwt from 'src/utils/jwt';

@Controller('userTakeBook')
export class UserTakeBookController {
  constructor(
    private readonly userTakeBookService: UserTakeBookService,
    private readonly userToken: TokenMiddleware,
  ) {}

  @Get('/get')
  @HttpCode(HttpStatus.OK)
  async findAll(@Headers() headers: any) {
    if (headers?.user_token) {
      const userId = await this.userToken.verifyUser(headers);
      if (userId) {
        return await this.userTakeBookService.findAll(userId)
      }
    } 
  }
}
