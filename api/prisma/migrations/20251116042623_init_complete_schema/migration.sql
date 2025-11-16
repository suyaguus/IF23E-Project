-- CreateEnum
CREATE TYPE "StatusKamar" AS ENUM ('Tersedia', 'Tersewa', 'TidakTersedia');

-- CreateEnum
CREATE TYPE "StatusPembayaran" AS ENUM ('Lunas', 'Pending', 'Expired', 'Dibatalkan');

-- CreateEnum
CREATE TYPE "MetodePembayaran" AS ENUM ('Transfer', 'Tunai');

-- AlterTable
ALTER TABLE "tb_user" ALTER COLUMN "role" SET DEFAULT 'User';

-- CreateTable
CREATE TABLE "tb_kamar" (
    "id" SERIAL NOT NULL,
    "nomorKamar" TEXT NOT NULL,
    "hargaSewa" INTEGER NOT NULL,
    "statusKamar" "StatusKamar" NOT NULL DEFAULT 'Tersedia',
    "deskripsi" TEXT NOT NULL,

    CONSTRAINT "tb_kamar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_fasilitas" (
    "id" SERIAL NOT NULL,
    "namaFasilitas" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,

    CONSTRAINT "tb_fasilitas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_perabotan" (
    "id" SERIAL NOT NULL,
    "namaPerabotan" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,

    CONSTRAINT "tb_perabotan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_kamar_fasilitas" (
    "kamarId" INTEGER NOT NULL,
    "fasilitasId" INTEGER NOT NULL,

    CONSTRAINT "tb_kamar_fasilitas_pkey" PRIMARY KEY ("kamarId","fasilitasId")
);

-- CreateTable
CREATE TABLE "tb_kamar_perabotan" (
    "kamarId" INTEGER NOT NULL,
    "perabotanId" INTEGER NOT NULL,
    "jumlah" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "tb_kamar_perabotan_pkey" PRIMARY KEY ("kamarId","perabotanId")
);

-- CreateTable
CREATE TABLE "tb_order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "kamarId" INTEGER NOT NULL,
    "tanggalPesanan" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalCheckin" TIMESTAMP(3) NOT NULL,
    "tanggalCheckout" TIMESTAMP(3) NOT NULL,
    "statusPembayaran" "StatusPembayaran" NOT NULL DEFAULT 'Pending',
    "totalHarga" INTEGER NOT NULL,
    "metodePembayaran" "MetodePembayaran" NOT NULL,
    "buktiPembayaran" TEXT,
    "catatanUser" TEXT,
    "catatanAdmin" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_riwayat_pembayaran" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "kamarId" INTEGER NOT NULL,
    "statusPembayaranLama" "StatusPembayaran",
    "statusPembayaranBaru" "StatusPembayaran" NOT NULL,
    "totalHarga" INTEGER NOT NULL,
    "metodePembayaran" "MetodePembayaran" NOT NULL,
    "buktiPembayaran" TEXT,
    "keterangan" TEXT,
    "diubahOleh" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_riwayat_pembayaran_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_kamar_nomorKamar_key" ON "tb_kamar"("nomorKamar");

-- CreateIndex
CREATE INDEX "tb_order_userId_idx" ON "tb_order"("userId");

-- CreateIndex
CREATE INDEX "tb_order_kamarId_idx" ON "tb_order"("kamarId");

-- CreateIndex
CREATE INDEX "tb_order_statusPembayaran_idx" ON "tb_order"("statusPembayaran");

-- CreateIndex
CREATE INDEX "tb_riwayat_pembayaran_orderId_idx" ON "tb_riwayat_pembayaran"("orderId");

-- CreateIndex
CREATE INDEX "tb_riwayat_pembayaran_userId_idx" ON "tb_riwayat_pembayaran"("userId");

-- CreateIndex
CREATE INDEX "tb_riwayat_pembayaran_kamarId_idx" ON "tb_riwayat_pembayaran"("kamarId");

-- CreateIndex
CREATE INDEX "tb_riwayat_pembayaran_createdAt_idx" ON "tb_riwayat_pembayaran"("createdAt");

-- AddForeignKey
ALTER TABLE "tb_kamar_fasilitas" ADD CONSTRAINT "tb_kamar_fasilitas_kamarId_fkey" FOREIGN KEY ("kamarId") REFERENCES "tb_kamar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_kamar_fasilitas" ADD CONSTRAINT "tb_kamar_fasilitas_fasilitasId_fkey" FOREIGN KEY ("fasilitasId") REFERENCES "tb_fasilitas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_kamar_perabotan" ADD CONSTRAINT "tb_kamar_perabotan_kamarId_fkey" FOREIGN KEY ("kamarId") REFERENCES "tb_kamar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_kamar_perabotan" ADD CONSTRAINT "tb_kamar_perabotan_perabotanId_fkey" FOREIGN KEY ("perabotanId") REFERENCES "tb_perabotan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_order" ADD CONSTRAINT "tb_order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_order" ADD CONSTRAINT "tb_order_kamarId_fkey" FOREIGN KEY ("kamarId") REFERENCES "tb_kamar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_riwayat_pembayaran" ADD CONSTRAINT "tb_riwayat_pembayaran_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "tb_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_riwayat_pembayaran" ADD CONSTRAINT "tb_riwayat_pembayaran_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_riwayat_pembayaran" ADD CONSTRAINT "tb_riwayat_pembayaran_kamarId_fkey" FOREIGN KEY ("kamarId") REFERENCES "tb_kamar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
