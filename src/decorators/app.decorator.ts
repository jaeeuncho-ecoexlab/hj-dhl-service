import { Constructor } from '.';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

type expressAppOption = {
    routers?: any[];
    statics?: any[];
    useCors?: boolean;
    baseUrl?: string;
    port?: string | number;
}

export function ExpressApp(options?: expressAppOption) { 
    return function<T extends Constructor>(constructor: T) {
        const appFactory = express();

        if (!options.baseUrl) {
            options.baseUrl = '/';
        }

        if (!options.port || parseInt(<string>options.port) == NaN) {
            options.port = 3000;
        }

        if (options.useCors) {
            appFactory.use(cors());
        }
        appFactory.use(bodyParser.urlencoded({ extended: false }));
        appFactory.use(bodyParser.json());

        options.routers.forEach(router => {
            const routerInstance = new router();
            appFactory.use(options.baseUrl, routerInstance['router']);
        }); 

        return class extends constructor {
            app = appFactory;
            start = () => { 
                this.app.listen(options.port, () => {console.log(`✅ App is listening to port ${options.port}.`)})
            };
        };
    }
}