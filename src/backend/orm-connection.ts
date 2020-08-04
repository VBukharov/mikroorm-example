import {MikroORM, Options} from "mikro-orm";
import path from "path";
import {remote} from "electron";
import {Dictionary} from "./entity/Dictionary";

const {app} = remote;
// discovery option is set because of
// https://mikro-orm.io/docs/deployment/#prepare-your-project-for-webpack
const config: Options = {
    entities: [Dictionary],
    discovery: {disableDynamicFileAccess: true},
    dbName: path.join(app.getAppPath(), 'resources', 'db', 'db.sqlite'),
    type: 'sqlite',
    migrations: {
        tableName: 'migrations', // name of database table with log of executed transactions
        path: path.join(app.getAppPath(), 'src', 'backend', 'migrations'),
        pattern: /^[\w-]+\d+\.ts$/, // regex pattern for the migration files
        transactional: true, // wrap each migration in a transaction
        disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
        allOrNothing: true, // wrap all migrations in master transaction
        dropTables: true, // allow to disable table dropping
        safe: false, // allow to disable table and column dropping
        emit: 'ts', // migration generation mode
    }
};

export default MikroORM.init(config)
    .then(async orm => {
            // todo as separate function with same config
            //  it's here just for test
            await orm.getMigrator().up(); // runs migrations up to the latest
            await orm.close(true);
        }
    ).then(() => MikroORM.init(config))
