/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `activo` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `actualizadoEn` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `creadoEn` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the `Permiso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RolPermiso` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RolPermiso" DROP CONSTRAINT "RolPermiso_permisoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RolPermiso" DROP CONSTRAINT "RolPermiso_rolId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UsuarioRol" DROP CONSTRAINT "UsuarioRol_rolId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UsuarioRol" DROP CONSTRAINT "UsuarioRol_usuarioId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified";

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "activo",
DROP COLUMN "actualizadoEn",
DROP COLUMN "creadoEn",
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "nombre" DROP NOT NULL;

-- DropTable
DROP TABLE "public"."Permiso";

-- DropTable
DROP TABLE "public"."RolPermiso";
