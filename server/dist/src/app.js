"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pg_1 = require("pg");
const routes_1 = require("./routes");
const redis_1 = require("redis");
const keys_1 = require("./keys");
const utils_1 = require("./utils");
class App {
    constructor() {
        this.routes = new routes_1.Routes();
        this.app = express();
        this.config();
        this.routes.routes(this.app, this.db, this.cache, this.cachePublisher);
    }
    config() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // postgres setup
        this.setupDatabase();
        // redis client setup
        this.setupCache();
    }
    setupCache() {
        utils_1.Utils.log(`Connecting to redis ...`);
        this.cache = redis_1.createClient({
            host: keys_1.ServerKeys.redisHost,
            port: +keys_1.ServerKeys.redisPort,
            retry_strategy: () => 1000
        });
        this.cachePublisher = this.cache.duplicate();
        this.cache.on('connect', () => {
            utils_1.Utils.log('Connected to Redis server');
            this.cache.set('visits', '0');
        });
        this.cache.on('error', err => utils_1.Utils.log(`Cannot connect to Redis server: ${err.message}`));
    }
    setupDatabase() {
        utils_1.Utils.log(`Connecting to postgres ...`);
        this.db = new pg_1.Pool({
            user: keys_1.ServerKeys.pgUser,
            password: keys_1.ServerKeys.pgPassword,
            host: keys_1.ServerKeys.pgHost,
            port: +keys_1.ServerKeys.pgPort,
            database: keys_1.ServerKeys.pgDatabase,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 15000
        });
        this.db.on('error', () => utils_1.Utils.log(`Lost connection to Postgres database`));
        this.db.query('CREATE TABLE IF NOT EXISTS values(number INT)')
            .catch(err => console.error(err));
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map