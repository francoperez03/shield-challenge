import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731586683350 implements MigrationInterface {
    name = 'Migration1731586683350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" RENAME COLUMN "chain" TO "chain_id"`);
        await queryRunner.query(`CREATE TABLE "chain" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "symbol" character varying NOT NULL, CONSTRAINT "UQ_d04674dd31adb83181ee0652f44" UNIQUE ("name"), CONSTRAINT "UQ_0d883a8a01754ef12f62cf1cf9e" UNIQUE ("symbol"), CONSTRAINT "PK_8e273aafae283b886672c952ecd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "chain_id"`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "chain_id" uuid`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_cc5b071530bd854d98d61b0968b" FOREIGN KEY ("chain_id") REFERENCES "chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_cc5b071530bd854d98d61b0968b"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "chain_id"`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "chain_id" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "chain"`);
        await queryRunner.query(`ALTER TABLE "wallet" RENAME COLUMN "chain_id" TO "chain"`);
    }

}
