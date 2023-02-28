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
import { CoursesOpenModule } from './module/coursesOpenUsers/coursesOpenUsers.module';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(config),
    TypeOrmModule.forRoot(connectDb),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
    VideoModule,
    CoursesModule,
    CoursesOpenModule,
    MiddlewareModule,
  ],
})
export class AppModule {}
