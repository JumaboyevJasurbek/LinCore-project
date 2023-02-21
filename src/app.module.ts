import { Module } from '@nestjs/common';
import { connectDb } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(connectDb),
  ],
})
export class AppModule {}
