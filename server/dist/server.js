"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const app = new app_1.App().app;
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Express server is listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map