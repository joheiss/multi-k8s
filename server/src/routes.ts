import {Request, Response} from "express";
import {RedisClient} from 'redis';
import {Pool} from 'pg';

export class Routes {

    public routes(app, db: Pool, cache: RedisClient, cachePublisher: RedisClient): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                console.log(`New visit!`);
                cache.get('visits', (err: any, visits: string) => {
                    res.status(200).send(`Number of visits: ${visits}`);
                   cache.set('visits', (+visits + 1).toString());
                });
            });
        app.route('/values/all')
            .get(async(req: Request, res: Response) => {
                console.log('Get all values');
                const values = await db.query('SELECT * FROM values');
                console.log('All values: ', values.rows);
                res.status(200).send(values.rows);
            });
        app.route('/values/current')
            .get(async(req: Request, res: Response) => {
                console.log('Get current values');
                cache.on('error', err => console.log);
                cache.hgetall('values', (err, values) => {
                    if (err) {
                        console.error('error at get current values: ', err);
                    } else {
                        console.log('values at get current values: ', values);
                    }
                    const entries = [];
                    for (let key in values) {
                        entries.push({index: key, result: values[key]})
                    }
                    console.log('current values: ', entries);
                    res.status(200).send(entries);
                });
            });
        app.route('/values')
            .post(async(req: Request, res: Response) => {
                console.log('Post index');
                const index = req.body.index;
                if (+index > 40) {
                    return res.status(422).send('Index too high!');
                }
                cache.hset('values', index, 'Nothing yet!');
                cachePublisher.publish('insert', index);
                db.query('INSERT INTO values(number) VALUES($1)', [index]);
                res.status(200).send({ working: true });
            });
    }
}
