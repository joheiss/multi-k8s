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
class Routes {
    routes(app, db, cache, cachePublisher) {
        app.route('/')
            .get((req, res) => {
            console.log(`New visit!`);
            cache.get('visits', (err, visits) => {
                res.status(200).send(`Number of visits: ${visits}`);
                cache.set('visits', (+visits + 1).toString());
            });
        });
        app.route('/values/all')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Get all values');
            const values = yield db.query('SELECT * FROM values');
            res.status(200).send(values.rows);
        }));
        app.route('/values/current')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Get current values');
            cache.hgetall('values', (err, values) => {
                res.status(200).send(values);
            });
        }));
        app.route('/values')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Post index');
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