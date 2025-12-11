-- CreateTable
CREATE TABLE "tb_accessToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_accessToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_refreshToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_refreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_accessToken_tokenId_key" ON "tb_accessToken"("tokenId");

-- CreateIndex
CREATE INDEX "tb_accessToken_userId_idx" ON "tb_accessToken"("userId");

-- CreateIndex
CREATE INDEX "tb_accessToken_tokenId_idx" ON "tb_accessToken"("tokenId");

-- CreateIndex
CREATE INDEX "tb_accessToken_expiresAt_idx" ON "tb_accessToken"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "tb_refreshToken_tokenId_key" ON "tb_refreshToken"("tokenId");

-- CreateIndex
CREATE INDEX "tb_refreshToken_userId_idx" ON "tb_refreshToken"("userId");

-- CreateIndex
CREATE INDEX "tb_refreshToken_tokenId_idx" ON "tb_refreshToken"("tokenId");

-- CreateIndex
CREATE INDEX "tb_refreshToken_expiresAt_idx" ON "tb_refreshToken"("expiresAt");

-- AddForeignKey
ALTER TABLE "tb_accessToken" ADD CONSTRAINT "tb_accessToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_refreshToken" ADD CONSTRAINT "tb_refreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
