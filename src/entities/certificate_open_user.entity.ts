import { CertificateEntity } from './certificate.entity';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'certificate_open_user' })
export class CertificateOpenUser extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  cou_id: string;

  @OneToOne(() => CertificateEntity)
  @JoinColumn()
  certificate_id: CertificateEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  user_id: UserEntity[];
}
