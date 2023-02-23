import { UserEntity } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenMiddleware } from './../../middleware/middleware.service';
import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { MiddlewareModule } from 'src/middleware/middleware.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), MiddlewareModule],
  controllers: [VideoController],
  providers: [VideoService, TokenMiddleware],
})
export class VideoModule {}
