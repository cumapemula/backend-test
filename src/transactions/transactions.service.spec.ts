import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { PrismaService } from 'src/prisma.service';
import { BooksService } from 'src/books/books.service';
import { MembersService } from 'src/members/members.service';
import { memberSeed } from '../../prisma/seeders/members';
import { bookSeed } from '../../prisma/seeders/books';

const timeDiff = jest.mock('../utils/getTimeDifference', () => ({
  getTimeDifference: jest.fn(),
}));
jest.mock('../utils/setPenaltyDate', () => ({
  setPenalty: jest.fn(),
}));

type ResponseType = {
  id: number;
  member_id: number;
  book_id: number;
  borrowing_date: Date;
  return_date: Date;
  returned: boolean;
};

const sampleResponse: ResponseType = {
  id: 1,
  member_id: 1,
  book_id: 1,
  borrowing_date: new Date(),
  return_date: new Date(),
  returned: true,
};

const prismaMock = {
  transactions: {
    create: jest.fn().mockResolvedValue(sampleResponse),
    update: jest.fn().mockResolvedValue(sampleResponse),
    findMany: jest.fn().mockResolvedValue(sampleResponse),
    findFirstOrThrow: jest.fn().mockResolvedValue(sampleResponse),
  },
};

const oneMember = memberSeed[0];

const memberServiceMock = {
  findOne: jest.fn().mockResolvedValue(oneMember),
  removePenalty: jest.fn().mockResolvedValue(oneMember),
  setPenalty: jest.fn().mockResolvedValue(oneMember),
};

const oneBook = bookSeed[0];

const bookServiceMock = {
  findOne: jest.fn().mockResolvedValue(oneBook),
  reduceStock: jest.fn().mockResolvedValue(oneBook),
  increaseStock: jest.fn().mockResolvedValue(oneBook),
};

describe('TransactionsService', () => {
  let service: TransactionsService;
  let member: MembersService;
  let book: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: BooksService, useValue: bookServiceMock },
        { provide: MembersService, useValue: memberServiceMock },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    member = module.get<MembersService>(MembersService);
    book = module.get<BooksService>(BooksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return one transaction', async () => {
    const id = 1;
    expect(await service.findOne(id)).toEqual(sampleResponse);
  });

  it('should return created object', async () => {
    const dto = {
      member_id: 1,
      book_id: 1,
    };
    expect(await service.create(dto)).toEqual(sampleResponse);
  });

  it('should return updated object', async () => {
    const dto = {
      member_id: 1,
      book_id: 1,
    };
    expect(await service.returnBook(dto)).toEqual(sampleResponse);
  });

  it('should return response {message: "You are still under sentence"}', async () => {
    const dto = {
      member_id: 1,
      book_id: 1,
    };
    const result = {
      message: 'You are still under sentence',
    };
    timeDiff.fn().mockImplementation(() => ({
      day: 8,
    }));
    jest.spyOn(member, 'findOne').mockResolvedValue({
      is_penalty: true,
      id: 1,
      code: 'M001',
      name: 'Angga',
      penalty_end_date: new Date(),
    });
    expect(await service.create(dto)).toEqual(result);
  });

  it('should return response {message: "the book is not available"}', async () => {
    const dto = {
      member_id: 1,
      book_id: 1,
    };
    const result = {
      message: 'the book is not available',
    };
    const dataBook = {
      id: 1,
      code: 'JK-45',
      title: 'Harry Potter',
      author: 'J.K Rowling',
      stock: 0,
    };
    timeDiff.fn().mockImplementation(() => ({
      day: 3,
    }));
    jest.spyOn(member, 'findOne').mockResolvedValue({
      is_penalty: false,
      id: 1,
      code: 'M001',
      name: 'Angga',
      penalty_end_date: new Date(),
    });
    jest.spyOn(book, 'findOne').mockResolvedValue(dataBook);
    expect(await service.create(dto)).toEqual(result);
  });

  it('should return response {message: "You have reached the total amount of borrow"}', async () => {
    const dto = {
      member_id: 1,
      book_id: 1,
    };
    const result = {
      message: 'You have reached the total amount of borrow',
    };
    const dataBook = {
      id: 1,
      code: 'JK-45',
      title: 'Harry Potter',
      author: 'J.K Rowling',
      stock: 1,
    };
    const transaction = [{ ...sampleResponse }, { ...sampleResponse }];
    timeDiff.fn().mockImplementation(() => ({
      day: 3,
    }));
    jest.spyOn(member, 'findOne').mockResolvedValue({
      is_penalty: false,
      id: 1,
      code: 'M001',
      name: 'Angga',
      penalty_end_date: new Date(),
    });
    jest.spyOn(book, 'findOne').mockResolvedValue(dataBook);
    jest.spyOn(service, 'findOne').mockResolvedValue(transaction);
    expect(await service.create(dto)).toEqual(result);
  });
});
