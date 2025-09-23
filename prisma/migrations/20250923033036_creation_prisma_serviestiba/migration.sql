-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `address` VARCHAR(150) NULL,
    `phone` VARCHAR(20) NULL,
    `dni` VARCHAR(10) NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatTerminal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `CatTerminal_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quotation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `proposalId` INTEGER NULL,
    `clientId` INTEGER NOT NULL,
    `workerId` INTEGER NULL,
    `terminalId` INTEGER NULL,
    `status` ENUM('Pendiente', 'Aprobada', 'Rechazada') NOT NULL DEFAULT 'Pendiente',
    `pdfUrl` VARCHAR(255) NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `ruc` CHAR(11) NULL,
    `accountNumber` VARCHAR(20) NULL,
    `generalNumber` VARCHAR(20) NULL,
    `secondaryEmail` VARCHAR(100) NULL,
    `position` VARCHAR(50) NULL,
    `bankAccount` VARCHAR(25) NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Client_ruc_key`(`ruc`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estibador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `district` VARCHAR(30) NULL,
    `status` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    `aptoMolitalia` BOOLEAN NOT NULL DEFAULT false,
    `aptoNestle` BOOLEAN NOT NULL DEFAULT false,
    `age` INTEGER NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Worker` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `position` VARCHAR(12) NOT NULL,
    `terminalId` INTEGER NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BankAccountDetails` (
    `accountId` INTEGER NOT NULL AUTO_INCREMENT,
    `clientId` INTEGER NOT NULL,
    `accountName` VARCHAR(50) NOT NULL,
    `accountNumber` VARCHAR(30) NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `BankAccountDetails_clientId_accountNumber_key`(`clientId`, `accountNumber`),
    PRIMARY KEY (`accountId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proposal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientId` INTEGER NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `time` ENUM('Dia', 'Noche') NOT NULL,
    `unity` VARCHAR(10) NULL,
    `location` VARCHAR(50) NULL,
    `product` VARCHAR(50) NULL,
    `activity` VARCHAR(50) NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuotationEstibador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quotationId` INTEGER NOT NULL,
    `estibadorId` INTEGER NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `QuotationEstibador_quotationId_estibadorId_key`(`quotationId`, `estibadorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Requirement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quotationId` INTEGER NOT NULL,
    `clientId` INTEGER NOT NULL,
    `status` ENUM('En_Proceso', 'Finalizado', 'Rechazado') NOT NULL DEFAULT 'En_Proceso',
    `cotizacionUrl` VARCHAR(150) NULL,
    `facturacionUrl` VARCHAR(150) NULL,
    `cumplimientoUrl` VARCHAR(150) NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Quotation` ADD CONSTRAINT `Quotation_proposalId_fkey` FOREIGN KEY (`proposalId`) REFERENCES `Proposal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quotation` ADD CONSTRAINT `Quotation_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quotation` ADD CONSTRAINT `Quotation_workerId_fkey` FOREIGN KEY (`workerId`) REFERENCES `Worker`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quotation` ADD CONSTRAINT `Quotation_terminalId_fkey` FOREIGN KEY (`terminalId`) REFERENCES `CatTerminal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Estibador` ADD CONSTRAINT `Estibador_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Worker` ADD CONSTRAINT `Worker_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Worker` ADD CONSTRAINT `Worker_terminalId_fkey` FOREIGN KEY (`terminalId`) REFERENCES `CatTerminal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BankAccountDetails` ADD CONSTRAINT `BankAccountDetails_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Proposal` ADD CONSTRAINT `Proposal_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuotationEstibador` ADD CONSTRAINT `QuotationEstibador_quotationId_fkey` FOREIGN KEY (`quotationId`) REFERENCES `Quotation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuotationEstibador` ADD CONSTRAINT `QuotationEstibador_estibadorId_fkey` FOREIGN KEY (`estibadorId`) REFERENCES `Estibador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Requirement` ADD CONSTRAINT `Requirement_quotationId_fkey` FOREIGN KEY (`quotationId`) REFERENCES `Quotation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Requirement` ADD CONSTRAINT `Requirement_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
