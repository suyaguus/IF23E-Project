/*
  Warnings:

  - The primary key for the `tb_kamar_fasilitas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tb_kamar_perabotan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[kamarId,fasilitasId]` on the table `tb_kamar_fasilitas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kamarId,perabotanId]` on the table `tb_kamar_perabotan` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tb_kamar_fasilitas" DROP CONSTRAINT "tb_kamar_fasilitas_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "tb_kamar_fasilitas_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tb_kamar_perabotan" DROP CONSTRAINT "tb_kamar_perabotan_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "tb_kamar_perabotan_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "tb_kamar_fasilitas_kamarId_fasilitasId_key" ON "tb_kamar_fasilitas"("kamarId", "fasilitasId");

-- CreateIndex
CREATE UNIQUE INDEX "tb_kamar_perabotan_kamarId_perabotanId_key" ON "tb_kamar_perabotan"("kamarId", "perabotanId");
