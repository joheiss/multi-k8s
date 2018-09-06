import {createClient, RedisClient} from 'redis';
import {RedisKeys} from './keys';

const client: RedisClient = createClient({
    host: RedisKeys.host,
    port: +RedisKeys.port,
    retry_strategy: () => 1000
});

const subscription = client.duplicate();

subscription.on('error', err => console.error);

subscription.on('message', (channel: string, message: string) => {
    console.log('worker received message: ', message);
    const result = fib(parseInt(message));
    console.log(`calculated fib for index ${message}: ${result}`);
    client.hset('values', message, result.toString())
});

subscription.subscribe('insert');

function fib(index: number): number {
    if (index < 2) return 1;
    return fib(index - 1) + fib(index - 2);
}
