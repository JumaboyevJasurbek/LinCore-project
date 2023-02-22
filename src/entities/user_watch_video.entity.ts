import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { Videos } from './video.entity';

@Entity({ name: 'user_watch_video' })
export class UserWatchVideo {
  @PrimaryGeneratedColumn('uuid')
  uwv_id: string;

  @ManyToOne(() => Videos, (video) => video.user_watch_video)
  video_id: Videos;

  @ManyToOne(() => UserEntity, (user) => user.watch_video)
  user_id: UserEntity;
}
