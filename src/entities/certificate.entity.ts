import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseEntity } from './course.entity';
import { CertificateOpenUser } from './certificate_open_user.entity';

@Entity({ name: 'certificate' })
export class CertificateEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  certificate_id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  certificate_link: string;

  @OneToOne(() => CourseEntity)
  @JoinColumn()
  certificate_course: CourseEntity;

  @ManyToOne(() => CertificateOpenUser)
  @JoinColumn()
  certificate_open: CertificateOpenUser[];
}
