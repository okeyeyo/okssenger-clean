import dotenv from "dotenv";
dotenv.config(); // ← 환경변수 보장

import mysql from "mysql2/promise";

console.log("💾 DB 접속 정보:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  pass: Boolean(process.env.DB_PASSWORD) ? "••••••" : "<empty>",
  name: process.env.DB_NAME,
});

export const db = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});
