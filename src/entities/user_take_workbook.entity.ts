import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { Workbook } from './workbook.entity';

@Entity({ name: 'user_take_workbook' })
export class UserTakeWorkbook {
  @PrimaryGeneratedColumn('uuid')
  utw_id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  utw_connection: string;

  @Column({
    type: 'boolean',
    default: true,
    nullable: false,
  })
  utw_active: boolean;

  @ManyToOne(() => Workbook, (workbook) => workbook.take_user)
  workbook_id: Workbook;

  @ManyToOne(() => UserEntity, (user) => user.take_workbook)
  user_id: UserEntity;
}
