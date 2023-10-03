-- CreateTable
CREATE TABLE "Members" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_penalty" BOOLEAN NOT NULL DEFAULT false,
    "penalty_end_date" TIMESTAMP(3),

    CONSTRAINT "Members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Books" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "member_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "borrowing_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "return_date" TIMESTAMP(3),
    "returned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Members_code_key" ON "Members"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Books_code_key" ON "Books"("code");

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
