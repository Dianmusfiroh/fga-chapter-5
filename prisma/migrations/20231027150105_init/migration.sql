/*
  Warnings:

  - Made the column `bank_name` on table `Bank_accounts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bank_account_number` on table `Bank_accounts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bank_accounts" ALTER COLUMN "bank_name" SET NOT NULL,
ALTER COLUMN "bank_account_number" SET NOT NULL;
