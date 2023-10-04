import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Book } from './entities/book.entity';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Show all available books' })
  @ApiOkResponse({ description: 'Return all available books', type: [Book] })
  findAll() {
    return this.booksService.findAll();
  }
}
