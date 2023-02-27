import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @IsString()
  course_title: string;

  @IsString()
  course_description: string;
  @IsString()
  course_price: string;
  @IsNumber()
  course_sequence: number;
}
