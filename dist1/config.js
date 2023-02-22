"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
exports.connectDb = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    password: String(process.env.DB_PASSWORD),
    username: process.env.DB_USERNAME,
    database: process.env.DATABASE,
    entities: [],
    autoLoadEntities: true,
    synchronize: true,
};
//# sourceMappingURL=config.js.map