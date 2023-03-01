import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from 'src/entities/course.entity';
import { CoursesOpenUsers } from 'src/entities/course_open_users.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly CoursesRepository: Repository<CourseEntity>,
  ) {}
  create(CreateCourseDto: CreateCourseDto) {
    return this.CoursesRepository.save(CreateCourseDto as any);
  }

  async findAll() {
    return await  this.CoursesRepository.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} course`;
  }

  update(id: string, UpdateCourseDto: UpdateCourseDto) {
    return this.CoursesRepository.update(id, UpdateCourseDto as any);
  }

  remove(id: string) {
    return this.CoursesRepository.delete(id);
  }
}
