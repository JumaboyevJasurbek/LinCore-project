import { CertificateEntity } from './certificate.entity';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'certificate_open_user' })
export class CertificateOpenUser extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  cou_id: string;

  @OneToMany(
    () => CertificateEntity,
    (certifikat) => certifikat.certificate_open,
  )
  @JoinColumn()
  certificate_id: CertificateEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: 'certificates_open_users',
  })
  user_id: UserEntity[];
}
