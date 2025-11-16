/*
  Warnings:

  - You are about to alter the column `namaFasilitas` on the `tb_fasilitas` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `namaPerabotan` on the `tb_perabotan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `username` on the `tb_user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - A unique constraint covering the columns `[kodeFasilitas]` on the table `tb_fasilitas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kodeOrder]` on the table `tb_order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kodePerabotan]` on the table `tb_perabotan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kodeRiwayat]` on the table `tb_riwayat_pembayaran` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kodeFasilitas` to the `tb_fasilitas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kodeOrder` to the `tb_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kodePerabotan` to the `tb_perabotan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kodeRiwayat` to the `tb_riwayat_pembayaran` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_fasilitas" ADD COLUMN     "kodeFasilitas" TEXT NOT NULL,
ALTER COLUMN "namaFasilitas" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "tb_order" ADD COLUMN     "kodeOrder" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tb_perabotan" ADD COLUMN     "kodePerabotan" TEXT NOT NULL,
ALTER COLUMN "namaPerabotan" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "tb_riwayat_pembayaran" ADD COLUMN     "kodeRiwayat" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tb_user" ALTER COLUMN "username" SET DATA TYPE VARCHAR(50);

-- CreateIndex
CREATE UNIQUE INDEX "tb_fasilitas_kodeFasilitas_key" ON "tb_fasilitas"("kodeFasilitas");

-- CreateIndex
CREATE UNIQUE INDEX "tb_order_kodeOrder_key" ON "tb_order"("kodeOrder");

-- CreateIndex
CREATE UNIQUE INDEX "tb_perabotan_kodePerabotan_key" ON "tb_perabotan"("kodePerabotan");

-- CreateIndex
CREATE UNIQUE INDEX "tb_riwayat_pembayaran_kodeRiwayat_key" ON "tb_riwayat_pembayaran"("kodeRiwayat");
