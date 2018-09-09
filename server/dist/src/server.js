"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const utils_1 = require("./utils");
const app = new app_1.App().app;
const PORT = 5000;
app.listen(PORT, () => {
    utils_1.Utils.log(`Express server is listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map