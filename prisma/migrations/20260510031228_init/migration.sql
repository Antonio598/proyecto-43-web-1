-- CreateTable
CREATE TABLE "PendingOrder" (
    "orderId" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "experienceTitle" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "people" INTEGER NOT NULL,
    "tierLabel" TEXT NOT NULL,
    "depositPaid" REAL NOT NULL,
    "fullPrice" REAL NOT NULL,
    "specialRequests" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "experienceTitle" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "people" INTEGER NOT NULL,
    "tierLabel" TEXT NOT NULL,
    "depositPaid" REAL NOT NULL,
    "fullPrice" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'confirmed',
    "specialRequests" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "AvailabilityBlock" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "slug" TEXT,
    "reason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_orderId_key" ON "Booking"("orderId");
