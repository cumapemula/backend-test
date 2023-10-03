import { IsNumber, IsDate, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  member_id: number;

  @IsNumber()
  book_id: number;

  @IsDate()
  @IsOptional()
  return_date: Date;
}
