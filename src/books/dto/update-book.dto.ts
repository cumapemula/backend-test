import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateBookDto {
  @ApiProperty()
  @IsNumber()
  stock: number;
}
