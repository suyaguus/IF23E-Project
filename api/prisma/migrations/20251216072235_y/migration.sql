/*
  Warnings:

  - You are about to drop the column `resetToken` on the `tb_user` table. All the data in the column will be lost.
  - You are about to drop the column `resetTokenExpiry` on the `tb_user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "tb_user_resetToken_key";

-- AlterTable
ALTER TABLE "tb_user" DROP COLUMN "resetToken",
DROP COLUMN "resetTokenExpiry";
