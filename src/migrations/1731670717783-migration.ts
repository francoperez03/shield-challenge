import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731670717783 implements MigrationInterface {
    name = 'Migration1731670717783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chain" ADD "chainId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chain" ADD CONSTRAINT "UQ_2ee44ccbca016ecab2b223ba752" UNIQUE ("chainId")`);
        await queryRunner.query(`ALTER TABLE "chain" DROP CONSTRAINT "UQ_d04674dd31adb83181ee0652f44"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chain" ADD CONSTRAINT "UQ_d04674dd31adb83181ee0652f44" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "chain" DROP CONSTRAINT "UQ_2ee44ccbca016ecab2b223ba752"`);
        await queryRunner.query(`ALTER TABLE "chain" DROP COLUMN "chainId"`);
    }

}
