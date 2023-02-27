import { Module } from '@nestjs/common';
import { connectDb } from './ormconfig/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { VideoModule } from './module/video/video.module';
import { CoursesModule } from './module/courses/courses.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { MiddlewareModule } from './middleware/middleware.module';
import { UserTakeBookModule } from './module/user-take-book/user-take-book.module';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(config),
    TypeOrmModule.forRoot(connectDb),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
    VideoModule,
    CoursesModule,
    MiddlewareModule,
    UserTakeBookModule,
  ],
})
export class AppModule {}
