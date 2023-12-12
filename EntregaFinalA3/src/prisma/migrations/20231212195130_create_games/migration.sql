-- CreateTable
CREATE TABLE "Games" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "imagem" TEXT,
    "descricao" TEXT,
    "plataforma" TEXT
);
