import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  member_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  book_id: number;
}
