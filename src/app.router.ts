import { Router, Get } from '@decorators';

@Router()
export class AppRouter {
    @Get()
    healthCheck() {
        return 'Healthy';
    }
}