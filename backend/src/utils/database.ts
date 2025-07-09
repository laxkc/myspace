import pg from "pg";
import { dbConfig } from "../configs/db.ts";

const { Pool } = pg;

const connectionString = `postgresql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;

// Database connection pool
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

export { pool };
