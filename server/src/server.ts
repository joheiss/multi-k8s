import {App} from "./app";

const app = new App().app;
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Express server is listening on port ${PORT}`);
});

