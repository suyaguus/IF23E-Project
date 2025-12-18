/*
  Warnings:

  - You are about to drop the `tb_accessToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_refreshToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tb_accessToken" DROP CONSTRAINT "tb_accessToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "tb_refreshToken" DROP CONSTRAINT "tb_refreshToken_userId_fkey";

-- DropTable
DROP TABLE "tb_accessToken";

-- DropTable
DROP TABLE "tb_refreshToken";
