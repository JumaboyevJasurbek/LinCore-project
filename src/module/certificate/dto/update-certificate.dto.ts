import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateCertificateDto } from './create-certificate.dto';

export class UpdateCertificateDto extends PartialType(CreateCertificateDto) {
  @ApiProperty({ name: 'courseId', type: 'string' })
  @IsString()
  private readonly courseId: string;
}
