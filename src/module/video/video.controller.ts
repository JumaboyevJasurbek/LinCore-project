import { TokenMiddleware } from './../../middleware/middleware.service';
import { CreateVideoDto } from './dto/create-video.dto';
import {
  Controller,
  Post,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  UploadedFile,
  Headers,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';
import { googleCloud } from 'src/utils/google-cloud';
import {
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import jwt from 'src/utils/jwt';

@Controller('video')
@ApiTags('Video')
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
    private readonly adminToken: TokenMiddleware,
  ) {}

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @ApiHeader({ name: 'admin_token', description: 'Admin Token' })
  @ApiBody({
    schema: {
      type: 'object',
      required: [
        'file',
        'title',
        'duration',
        'sequence',
        'course_id',
        'description',
      ],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        title: {
          type: 'string',
          default: '3-dars',
        },
        description: {
          type: 'string',
          default: 'Bugungi dars paloncha',
        },
        duration: {
          type: 'string',
          default: '30:00',
        },
        sequence: {
          type: 'number',
          default: 4,
        },
        course_id: {
          type: 'string',
          default: 'uuid',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Attendance Punch In' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Headers() headers: any,
    @Body() body: CreateVideoDto,
  ) {
    if (await this.adminToken.verifyAdmin(headers)) {
      const bool = googleCloud(file);
      const token = jwt.sign(body.course_id);
      console.log(token);
      console.log(bool);
    }
  }
}
