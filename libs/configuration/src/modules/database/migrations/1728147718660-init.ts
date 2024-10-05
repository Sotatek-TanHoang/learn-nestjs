import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class Init1728147718660 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [new TableColumn({ name: 'username', type: 'varchar' })],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('users');
  }
}
