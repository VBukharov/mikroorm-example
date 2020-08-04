// import {Migration} from "mikro-orm"
const { Migration} = require('mikro-orm')

class Migration29072020 extends Migration {

    async up() {
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

    async down() {
        this.addSql(`DROP TABLE dictionary`)
    }

}

exports.Migration29072020 = Migration29072020;
