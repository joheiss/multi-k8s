"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static log(logMessage) {
        const timestamp = new Date().toLocaleDateString();
        console.log(`SERVER LOG: ${timestamp} ### ${logMessage}`);
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map