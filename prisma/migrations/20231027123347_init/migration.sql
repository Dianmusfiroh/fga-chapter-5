-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bank_accounts" (
    "id" SERIAL NOT NULL,
    "bank_name" TEXT,
    "bank_account_number" TEXT,
    "balance" INTEGER NOT NULL,
    "user_Id" INTEGER NOT NULL,

    CONSTRAINT "Bank_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profiles" (
    "id" SERIAL NOT NULL,
    "identity_type" TEXT NOT NULL,
    "identity_number" TEXT NOT NULL,
    "address" TEXT,
    "user_Id" INTEGER NOT NULL,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "source_account_Id" INTEGER NOT NULL,
    "destination_account_Id" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Bank_accounts_bank_name_key" ON "Bank_accounts"("bank_name");

-- CreateIndex
CREATE UNIQUE INDEX "Bank_accounts_bank_account_number_key" ON "Bank_accounts"("bank_account_number");

-- CreateIndex
CREATE UNIQUE INDEX "Bank_accounts_user_Id_key" ON "Bank_accounts"("user_Id");

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_user_Id_key" ON "Profiles"("user_Id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_source_account_Id_key" ON "Transaction"("source_account_Id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_destination_account_Id_key" ON "Transaction"("destination_account_Id");

-- AddForeignKey
ALTER TABLE "Bank_accounts" ADD CONSTRAINT "Bank_accounts_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_destination_account_Id_fkey" FOREIGN KEY ("destination_account_Id") REFERENCES "Bank_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_source_account_Id_fkey" FOREIGN KEY ("source_account_Id") REFERENCES "Bank_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
