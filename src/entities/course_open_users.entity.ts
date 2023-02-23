import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseEntity } from './course.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'courses_open_users' })
export class CoursesOpenUsers extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  cou_id: string;

  @CreateDateColumn()
  create_data: Date;

  @ManyToOne(() => UserEntity, (user) => user.open_course)
  user_id: UserEntity;

  @ManyToOne(() => CourseEntity, (course) => course.open_user)
  course_id: CourseEntity;
}
