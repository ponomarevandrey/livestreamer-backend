import { logger } from "../config/logger";
import { Pool } from "pg";
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from "./env";

//
// Pg connection
//

// Store the connection pool
let pool: Pool | undefined;

async function connectDB(): Promise<Pool> {
  const config: PoolConfig = {
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: POSTGRES_PORT,
  };

  if (pool) {
    return pool;
  } else {
    pool = new Pool(config);
    logger.debug("New Postgres connection established");
    return pool;
  }
}

// Shutdown cleanly. Doc: https://node-postgres.com/api/pool#poolend
async function close(): Promise<void> {
  if (pool) {
    await pool.end();
  }

  pool = undefined;
  logger.debug("Pool has ended");
}

export { connectDB, close };
