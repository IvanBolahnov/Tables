-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('User', 'Moderator', 'Admin');

-- CreateEnum
CREATE TYPE "taskStatus" AS ENUM ('Waiting', 'InProccess', 'Ready');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL DEFAULT 'default.png',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL DEFAULT 'default.png',
    "slug" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOnGroup" (
    "groupId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "userRole" "userRole" NOT NULL DEFAULT 'User',

    CONSTRAINT "UserOnGroup_pkey" PRIMARY KEY ("userId","groupId")
);

-- CreateTable
CREATE TABLE "Table" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL DEFAULT 'default.png',
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "taskStatus" NOT NULL DEFAULT 'Waiting',
    "tableId" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Group_title_key" ON "Group"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Group_slug_key" ON "Group"("slug");

-- AddForeignKey
ALTER TABLE "UserOnGroup" ADD CONSTRAINT "UserOnGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnGroup" ADD CONSTRAINT "UserOnGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
