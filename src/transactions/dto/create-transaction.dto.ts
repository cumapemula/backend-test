import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  member_id: number;

  @IsNumber()
  @IsNotEmpty()
  book_id: number;
}
