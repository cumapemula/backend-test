export interface ITransaction {
  id: number;
  member_id: number;
  book_id: number;
  borrowing_date: Date;
  return_date: Date;
  returned: boolean;
}
