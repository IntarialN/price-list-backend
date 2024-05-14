import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface";
import { resolve } from 'path';
import { config } from 'dotenv';
import entities from "./entities";

config({ path: resolve(process.cwd(), '.env') });

export const DBConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_DB || '',
    synchronize: true,
    logging: false,
    entities: entities,
    migrations: ["migrations/*.ts"]
}
