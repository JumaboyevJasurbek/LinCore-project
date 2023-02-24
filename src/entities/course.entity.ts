import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CertificateEntity } from './certificate.entity';
import { CoursesOpenUsers } from './course_open_users.entity';
import { Videos } from './video.entity';
import { Workbook } from './workbook.entity';
import { WorkbookOpen } from './workbook_open.entity';

@Entity({ name: 'courses' })
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  course_id: string;

  @Column({
    type: 'character varying',
    length: 100,
    nullable: false,
  })
  course_title: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  course_description: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  course_price: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  course_sequence: string;

  @OneToOne(() => CertificateEntity)
  @JoinColumn()
  course_certificate: CertificateEntity;

  @OneToMany(() => WorkbookOpen, (workbook) => workbook.openbook_course)
  workbook_open: WorkbookOpen[];

  @OneToMany(() => Workbook, (workbook) => workbook.workbook_course)
  workbook: Workbook[];

  @OneToMany(() => Videos, (video) => video.videos_course)
  course_videos: Videos[];

  @OneToMany(() => CoursesOpenUsers, (user) => user.course_id)
  open_user: CoursesOpenUsers[];
}
