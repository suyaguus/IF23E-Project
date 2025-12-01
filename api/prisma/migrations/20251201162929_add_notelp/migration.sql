/*
  Warnings:

  - Added the required column `notelp` to the `tb_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_user" ADD COLUMN     "notelp" TEXT NOT NULL;
