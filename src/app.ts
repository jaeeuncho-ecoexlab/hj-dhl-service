import { AppRouter } from './app.router';
import { ExpressApp } from './decorators';

const PORT = process.env.PORT;
const ENV = process.env.ENV;

@ExpressApp({
    routers: [ AppRouter ],
    port: PORT,
})
class App { start };
const app = new App();
app.start();
