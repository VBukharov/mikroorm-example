import {Migration} from "mikro-orm";

export class Migration29072020 extends Migration {

    async up(): Promise<void> {
        this.addSql(
            `CREATE TABLE dictionary(
            id INTEGER NOT NULL PRIMARY KEY,
            key VARCHAR (255) NOT NULL, 
            value VARCHAR(255) NOT NULL)`
        );
        this.addSql(
            `INSERT INTO dictionary VALUES (1, 'counter', 0)`
        )
    }

    async down(): Promise<void> {
        this.addSql(`DROP TABLE dictionary`)
    }

}
