import { IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  course_title: string;

  @IsString()
  course_description: string;
  @IsString()
  course_price: string;
  @IsNumber()
  course_sequence: number;
}
