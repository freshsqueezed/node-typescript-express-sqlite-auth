import { Knex } from 'knex';
import { join } from 'path';

export interface ConnectionConfig {
  [key: string]: Knex.Config;
}

const defaultOptions: Knex.Config = {
  client: 'sqlite3',
  migrations: {
    directory: join(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: join(__dirname, 'src', 'database', 'seeds'),
  },
  useNullAsDefault: true,
};

const connection: ConnectionConfig = {
  development: config({
    connection: {
      filename: './auth.db',
    },
  }),

  test: config({
    connection: {
      filename: ':memory:',
    },
  }),
};

export default connection;

function config(overrides: Knex.Config) {
  return Object.assign({}, defaultOptions, overrides);
}
