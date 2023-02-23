import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { TokenMiddleware } from './middleware.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [TokenMiddleware],
})
export class MiddlewareModule {}
