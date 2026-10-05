import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "../Entity/UserEntity";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 14331,
  username: process.env.DB_USERNAME || "sa",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "nshoddies",
  options: {
    encrypt: false,
    trustServerCertificate: true
  },
  entities: [UserEntity],
  synchronize: false
});