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
<<<<<<< HEAD
import { CoursesOpenModule } from './module/coursesOpenUsers/coursesOpenUsers.module';
=======
import { UserTakeBookModule } from './module/user-take-book/user-take-book.module';
>>>>>>> b15daa5556afe1c051d2ff79edaeaf25a5bba0ce
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
    CoursesOpenModule,
    MiddlewareModule,
    UserTakeBookModule,
  ],
})
export class AppModule {}
