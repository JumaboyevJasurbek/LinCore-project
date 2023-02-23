import { Injectable } from '@nestjs/common';

@Injectable()
export class VideoService {
  create(createVideoDto: any) {
    console.log('This action adds a new video');
    console.log(createVideoDto);
  }
}
