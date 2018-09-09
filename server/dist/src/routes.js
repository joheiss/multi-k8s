"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class Routes {
    routes(app, db, cache, cachePublisher) {
        app.route('/')
            .get((req, res) => {
            utils_1.Utils.log(`New visit!`);
            cache.get('visits', (err, visits) => {
                res.status(200).send(`Number of visits: ${visits}`);
                cache.set('visits', (+visits + 1).toString());
            });
        });
        app.route('/values/all')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.log('Get all values');
            const values = yield db.query('SELECT * FROM values');
            console.log('All values: ', values.rows);
            res.status(200).send(values.rows);
        }));
        app.route('/values/current')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.log('Get current values');
            cache.on('error', err => console.log);
            cache.hgetall('values', (err, values) => {
                if (err) {
                    console.error('error at get current values: ', err);
                }
                else {
                    console.log('values at get current values: ', values);
                }
                const entries = [];
                for (let key in values) {
                    entries.push({ index: key, result: values[key] });
                }
                console.log('current values: ', entries);
                res.status(200).send(entries);
            });
        }));
        app.route('/values')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.log('Post index');
            const index = req.body.index;
            if (+index > 40) {
                return res.status(422).send('Index too high!');
            }
            cache.hset('values', index, 'Nothing yet!');
            cachePublisher.publish('insert', index);
            db.query('INSERT INTO values(number) VALUES($1)', [index]);
            res.status(200).send({ working: true });
        }));
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map