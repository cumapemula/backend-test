import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Member {
  @ApiPropertyOptional({ example: 1 })
  id?: number;

  @ApiProperty({ example: 'M001' })
  code: string;

  @ApiProperty({ example: 'Angga' })
  name: string;
}
