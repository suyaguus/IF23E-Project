-- AlterTable
ALTER TABLE "tb_fasilitas" ADD COLUMN     "imageId" TEXT,
ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "tb_perabotan" ADD COLUMN     "imageId" TEXT,
ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "tb_user" ADD COLUMN     "imageId" TEXT,
ADD COLUMN     "imageUrl" TEXT;

-- CreateTable
CREATE TABLE "tb_kamar_image" (
    "id" SERIAL NOT NULL,
    "kamarId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_kamar_image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tb_kamar_image_kamarId_idx" ON "tb_kamar_image"("kamarId");

-- AddForeignKey
ALTER TABLE "tb_kamar_image" ADD CONSTRAINT "tb_kamar_image_kamarId_fkey" FOREIGN KEY ("kamarId") REFERENCES "tb_kamar"("id") ON DELETE CASCADE ON UPDATE CASCADE;
