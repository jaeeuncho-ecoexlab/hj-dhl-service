import { Constructor } from '.';
import * as express from 'express';

type routerOptions = {
    baseUrl?: string;
}

export function Router(routerOptions?: routerOptions) { 
    return function<T extends Constructor>(constructor: T) {
        const descriptors = Object.getOwnPropertyDescriptors(constructor.prototype);
        const router = express.Router();
        Object.keys(descriptors).forEach(element => {
            if (element[0] != '_') {
                return;
            }

            const { value: { httpContext, httpMethod } } = descriptors[element];
            const { value: controller } = descriptors[element.slice(1, element.length)];
            router[ httpMethod ](httpContext, (req, res) => { res.send(controller()) });
        });
        return class extends constructor {
            router: express.Router = router;
        };
    }
}

export function Get(httpContext?: string, options?) {
    if (!httpContext) {
        httpContext = '/';
    }
    const httpMethod = 'get';

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Object.defineProperty(target, `_${propertyKey}`, { value: { httpContext, httpMethod } });
    }
}

export function Post(httpContext?: string, options?) {
    if (!httpContext) {
        httpContext = '/';
    }
    const httpMethod = 'post';

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Object.defineProperty(target, `_${propertyKey}`, { value: { httpContext, httpMethod } });
    }
}

export function Put(httpContext?: string, options?) {
    if (!httpContext) {
        httpContext = '/';
    }
    const httpMethod = 'post';

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Object.defineProperty(target, `_${propertyKey}`, { value: { httpContext, httpMethod } });
    }
}

export function Delete(httpContext?: string, options?) {
    if (!httpContext) {
        httpContext = '/';
    }
    const httpMethod = 'post';

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Object.defineProperty(target, `_${propertyKey}`, { value: { httpContext, httpMethod } });
    }
}

export function NestedRouter(httpContext: string) {
    
}