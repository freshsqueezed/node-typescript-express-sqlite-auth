import { Knex } from 'knex';
import { join } from 'path';

export interface ConnectionConfig {
  [key: string]: Knex.Config;
}

const defaultOptions: Knex.Config = {
  client: 'postgresql',
  migrations: {
    directory: join(__dirname, 'src', 'database', 'migrations'),
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: join(__dirname, 'src', 'database', 'seeds'),
  },
  pool: {
    min: 2,
    max: 10,
  },
};

const connection: ConnectionConfig = {
  test: config({
    connection: {
      database: 'node_typescript_express_pg_auth',
    },
  }),

  development: config({
    connection: {
      database: 'node_typescript_express_pg_auth_test',
    },
  }),
};

export default connection;

function config(overrides: Knex.Config) {
  return Object.assign({}, defaultOptions, overrides);
}
