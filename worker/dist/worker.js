"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const keys_1 = require("./keys");
const client = redis_1.createClient({
    host: keys_1.RedisKeys.host,
    port: +keys_1.RedisKeys.port,
    retry_strategy: () => 1000
});
const subscription = client.duplicate();
subscription.on('message', (channel, message) => {
    client.hset('values', message, fib(parseInt(message)).toString());
});
subscription.subscribe('insert');
function fib(index) {
    if (index < 2)
        return 1;
    return fib(index - 1) + fib(index - 2);
}
//# sourceMappingURL=worker.js.map