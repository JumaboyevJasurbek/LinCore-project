import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity({ name: 'workbook_open' })
export class WorkbookOpen {
  @PrimaryGeneratedColumn('uuid')
  openbook_id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  openbook_link: string;

  @ManyToOne(() => CourseEntity, (course) => course.workbook_open)
  openbook_course: CourseEntity;

  @Column({
    type: 'integer',
    nullable: false,
  })
  openbook_sequence: number;
}
