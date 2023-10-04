import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

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

describe('TransactionsController', () => {
  let controller: TransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: TransactionsService,
          useValue: {
            create: jest
              .fn<ResponseType, []>()
              .mockImplementation(() => sampleResponse),
            returnBook: jest
              .fn<ResponseType, []>()
              .mockImplementation(() => sampleResponse),
          },
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return updated transaction', async () => {
    const dto = {
      member_id: 1,
      book_id: 1,
    };
    expect(await controller.create(dto)).toEqual(sampleResponse);
  });

  it('should return updated transaction', async () => {
    const dto = {
      member_id: 1,
      book_id: 1,
    };
    expect(await controller.update(dto)).toEqual(sampleResponse);
  });
});
