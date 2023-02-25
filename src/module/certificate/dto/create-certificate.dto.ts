import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCertificateDto {
  @ApiProperty({ name: 'courseId', type: 'string', required: true })
  @IsString()
  private readonly courseId: string;
}
