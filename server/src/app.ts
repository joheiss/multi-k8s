import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { Pool } from "pg";

import { Routes } from "./routes";
import { RedisClient, createClient } from "redis";
import {ServerKeys} from './keys';

export class App {
    public app: express.Application;
    public routes: Routes = new Routes();
    public db: Pool;
    public cache: RedisClient;
    public cachePublisher: RedisClient;

    constructor() {
        this.app = express();
        this.config();
        this.routes.routes(this.app, this.db, this.cache, this.cachePublisher);
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // postgres setup
        this.setupDatabase();
        // redis client setup
        this.setupCache();

    }

    private setupCache(): void {
        console.log('connecting redis ...');
        this.cache = createClient({
            host: ServerKeys.redisHost,
            port: +ServerKeys.redisPort,
            retry_strategy: () => 1000
        });
        this.cachePublisher = this.cache.duplicate();

        this.cache.on('connect', () => {
            console.log('Connected to Redis server');
            this.cache.set('visits', '0');
        });
        this.cache.on('error', err => console.log(`Cannot connect to Redis server: ${err.message}`));
    }

    private setupDatabase(): void {
        console.log('connecting postgres ...');
        this.db = new Pool({
            user: ServerKeys.pgUser,
            password: ServerKeys.pgPassword,
            host: ServerKeys.pgHost,
            port: +ServerKeys.pgPort,
            database: ServerKeys.pgDatabase,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 15000
        });
        this.db.on('error', () => console.log(`Lost connection to Postgres database`));
        this.db.query('CREATE TABLE IF NOT EXISTS values(number INT)')
            .catch(err => console.error(err));
    }
}

