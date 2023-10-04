import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { bookSeed } from '../../prisma/seeders/books';
import { PrismaService } from 'src/prisma.service';

const oneBook = bookSeed[0];

const dbMock = {
  books: {
    findMany: jest.fn().mockResolvedValue(bookSeed),
    findUnique: jest.fn().mockResolvedValue(oneBook),
    update: jest.fn().mockResolvedValue(oneBook),
  },
};

describe('BooksService', () => {
  let service: BooksService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: PrismaService,
          useValue: dbMock,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of books', async () => {
    expect(await service.findAll()).toEqual(bookSeed);
  });

  it('should return one book', async () => {
    const id = 1;
    expect(await service.findOne(id)).toEqual(oneBook);
  });

  it('should return update book', async () => {
    const id = 1;
    expect(await service.reduceStock(id)).toEqual(oneBook);
  });

  it('should return update book', async () => {
    const id = 1;
    expect(await service.increaseStock(id)).toEqual(oneBook);
  });
});
