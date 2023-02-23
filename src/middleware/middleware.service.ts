import { HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import jwt from 'src/utils/jwt';

export class TokenMiddleware {
  async verifyAdmin(headers: any) {
    if (!headers.admin_token) {
      throw new HttpException('Bad Request in Token', HttpStatus.BAD_REQUEST);
    }
    const idAndEmail = jwt.verify(headers.admin_token);
    console.log(idAndEmail);
    if (!idAndEmail) {
      throw new HttpException('Bad Request in Token', HttpStatus.BAD_REQUEST);
    }
    const admin = await UserEntity.findOneBy({
      user_id: idAndEmail.id,
      email: idAndEmail.email,
    });
    if (!admin.email) {
      throw new HttpException('Siz admin emassiz', HttpStatus.BAD_REQUEST);
    }
    return true;
  }

  async verifyUser(headers: any) {
    if (!headers.admin_token) {
      throw new HttpException('Bad Request in Token', HttpStatus.BAD_REQUEST);
    }
    const idAndEmail = jwt.verify(headers.admin_token);
    if (!idAndEmail) {
      throw new HttpException('Bad Request in Token', HttpStatus.BAD_REQUEST);
    }
    const user = await UserEntity.findOneBy({
      user_id: idAndEmail.id,
      email: idAndEmail.email,
    });
    if (!user.email) {
      throw new HttpException('Bad Request in Token', HttpStatus.BAD_REQUEST);
    }
    return true;
  }
}
