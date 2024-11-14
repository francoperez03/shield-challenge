import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731589402407 implements MigrationInterface {
    name = 'Migration1731589402407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chain" DROP CONSTRAINT "UQ_0d883a8a01754ef12f62cf1cf9e"`);
        await queryRunner.query(`ALTER TABLE "chain" DROP COLUMN "symbol"`);
        await queryRunner.query(`ALTER TABLE "chain" ADD "network" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chain" ADD "rpcUrl" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chain" ADD "explorerUrl" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chain" DROP COLUMN "explorerUrl"`);
        await queryRunner.query(`ALTER TABLE "chain" DROP COLUMN "rpcUrl"`);
        await queryRunner.query(`ALTER TABLE "chain" DROP COLUMN "network"`);
        await queryRunner.query(`ALTER TABLE "chain" ADD "symbol" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chain" ADD CONSTRAINT "UQ_0d883a8a01754ef12f62cf1cf9e" UNIQUE ("symbol")`);
    }

}
