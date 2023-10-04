import knex from 'knex';
import connection from '../../knexfile';
import { NODE_ENV } from '../config';

export default knex(connection[NODE_ENV]);
