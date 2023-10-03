import { IsNumber } from 'class-validator';

export class UpdateBookDto {
  @IsNumber()
  stock: number;
}
