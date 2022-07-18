-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('credit', 'debit', 'credit_debit');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credentials" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "url" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "safeNotes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "annotation" VARCHAR(1000) NOT NULL,

    CONSTRAINT "safeNotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "number" TEXT NOT NULL,
    "holderName" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,
    "expirationDate" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVirtual" BOOLEAN NOT NULL,
    "type" "CardType" NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wifiPasswords" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "netName" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "wifiPasswords_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "credentials_title_userId_key" ON "credentials"("title", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "safeNotes_title_userId_key" ON "safeNotes"("title", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "cards_title_userId_key" ON "cards"("title", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "wifiPasswords_title_userId_key" ON "wifiPasswords"("title", "userId");

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "safeNotes" ADD CONSTRAINT "safeNotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wifiPasswords" ADD CONSTRAINT "wifiPasswords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
