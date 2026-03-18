/*
  Warnings:

  - The `color` column on the `Base` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BaseColor" AS ENUM ('PINK_LIGHT', 'PEACH_LIGHT', 'YELLOW_LIGHT', 'GREEN_LIGHT', 'TEAL_LIGHT', 'SKY_LIGHT', 'BLUE_LIGHT', 'PURPLE_LIGHT', 'LAVENDER_LIGHT', 'GRAY_LIGHT', 'RED', 'ORANGE', 'YELLOW', 'GREEN', 'TEAL', 'CYAN', 'BLUE', 'PINK', 'PURPLE', 'GRAY');

-- AlterTable
ALTER TABLE "Base" DROP COLUMN "color",
ADD COLUMN     "color" "BaseColor" NOT NULL DEFAULT 'BLUE';
