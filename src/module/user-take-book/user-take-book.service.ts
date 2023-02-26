import { reverse } from 'dns';
import { UserEntity } from './../../entities/user.entity';
import { join, extname } from 'path';
import { TokenMiddleware } from './../../middleware/middleware.service';
import { Body, Headers } from '@nestjs/common/decorators';
import { UserTakeWorkbook } from './../../entities/user_take_workbook.entity';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserTakeBookService {
  constructor(
    @InjectRepository(UserTakeWorkbook)
    private userTakeBook: Repository<UserTakeWorkbook>,
    private readonly userToken: TokenMiddleware,
  ) {}

  async findAll(headers: string) {
    const allWorkBook: any = await UserTakeWorkbook.find({
      relations: {
        workbook_id: true,
      },
    });

    const obj = [...allWorkBook];
    if (headers) {
      const active = await UserEntity.findOne({
        where: {
          user_id: headers,
        },
      });

      if (active) {
        for (let i = 0; i < obj.length; i++) {
          obj[i].utw_active = true;
        }
        return obj;
      } else {
        const noactive =
          (obj[0].utw_active = false) +
          'swdefrgty' +
          'wdefrr'.split('').reverse().join('-');
        return noactive;
      }
    }
    return obj;
  }
}
