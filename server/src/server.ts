import {App} from "./app";
import {Utils} from './utils';

const app = new App().app;
const PORT = 5000;

app.listen(PORT, () => {
    Utils.log(`Express server is listening on port ${PORT}`);
});

