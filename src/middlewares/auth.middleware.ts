import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Для начала вам нужно авторизоваться' });
        }

        next();
    }
}
