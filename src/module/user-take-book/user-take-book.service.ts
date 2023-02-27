import { UserTakeWorkbook } from './../../entities/user_take_workbook.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import { Workbook } from 'src/entities/workbook.entity';

@Injectable()
export class UserTakeBookService {
  async findOne(id: any, userId: any, res: Response) {
    const takeWorkbook: UserTakeWorkbook = await UserTakeWorkbook.findOne({
      where: {
        workbook_id: id,
        user_id: userId,
      },
    }).catch(() => {
      throw new HttpException('Workbook Not Found', HttpStatus.NOT_FOUND);
    });

    if (takeWorkbook.utw_active) {
      const workbook = await Workbook.findOne({
        where: {
          workbook_id: id,
        },
      }).catch(() => {
        throw new HttpException('Workbook Not Found', HttpStatus.NOT_FOUND);
      });

      const fileStream = fs.createWriteStream(workbook.workbook_link);
      console.log(fileStream);
      fileStream.pipe(res);

      await UserTakeWorkbook.createQueryBuilder()
        .update()
        .set({
          utw_active: false,
        })
        .where({
          utw_id: id,
        })
        .execute();
    } else {
      throw new HttpException('book already taken', HttpStatus.BAD_REQUEST);
    }
  }
}
