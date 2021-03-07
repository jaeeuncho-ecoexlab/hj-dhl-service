import * as express from 'express';

export function healthCheck(req: express.Request, res: express.Response) {
    res.status(200).send('Healthy');
}