import pg from "pg";
import { dbConfig } from "../configs/db.ts";

const { Pool } = pg;

// Database connection pool
const pool = new Pool(dbConfig);

export { pool };
