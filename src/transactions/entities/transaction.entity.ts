import { ApiProperty } from '@nestjs/swagger';

export class Transaction {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  member_id: number;

  @ApiProperty({ example: 1 })
  book_id: number;

  @ApiProperty({ example: new Date() })
  borrowing_date: Date;

  @ApiProperty({ example: new Date() })
  return_date: Date;

  @ApiProperty({ example: true })
  returned: boolean;
}
